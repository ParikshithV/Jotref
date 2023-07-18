import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { hex } from "../colors";
import PopupModal from "../common/PopupModal";
import axios from "axios";
import env from "react-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPopup = (props) => {

    const { loginPopup, setLoginPopup, checkForLogin } = props;

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [validationMsg, setValidationMsg] = useState("");
    const [infoTxt, setInfoTxt] = useState("");
    const[isWorking, setIsWorking] = useState(false);

    useEffect(() => {
        setValidationMsg("");
    }, [email, otp]);

    const storeUserData = async (key, value) => {
        const stringifiedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, stringifiedValue);
        setTimeout(() => {
            checkForLogin();
        }, 1000);
    }

    const sendEmailOtp = () => {
        const emailLower = email.toLowerCase();
        const emailVerify = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(emailVerify.test(emailLower), emailLower);
        if (!emailVerify.test(emailLower)) {
            setValidationMsg("Please enter a valid email address.");
        } else {
            axios.post(`${env.API_URL}/sendemailotp`, {
                email: emailLower,
            })
                .then(res => {
                    console.log(res);
                    setOtpSent(true);
                    setValidationMsg("");
                    // setInfoTxt("OTP sent to your email address. Please check your inbox.");
                    setTimeout(() => {
                        setInfoTxt("");
                    }, 5000);
                    setIsWorking(false);
                })
                .catch(err => {
                    console.log(err.response.status);
                    setValidationMsg(err.response.data.message);
                    err.response.status !== 500 && setIsWorking(false);
                });
        }
    }

    const verifyOtp = () => {
        const isOtpValid = /^[0-9]{4}$/;
        if (!isOtpValid.test(otp)) {
            setValidationMsg("Please enter valid OTP.");
            return;
        }
        axios.post(`${env.API_URL}/verifyemailotp`, {
            email: email.toLowerCase(),
            otp: otp,
        })
            .then(res => {
                console.log(res.data);
                if (res.data.status === true) {
                    console.log("OTP verified successfully.");
                    alert("OTP verified successfully.");
                    const userSeshData = {
                        email: email.toLowerCase(),
                        token: res.data.userId,
                    };
                    storeUserData("jotrefUser", userSeshData);
                    setLoginPopup(false);
                    setOtpSent(false);
                    setIsWorking(false);
                } else {
                    console.log("Invalid OTP. Please try again.");
                    setValidationMsg("Invalid OTP. Please try again.");
                }
                // setLoginPopup(false);
            })
            .catch(err => {
                console.log(err);
                setIsWorking(false);
            });
    }

    const _onPopupSubmit = () => {
        setIsWorking(true);
        if (!otpSent) {
            sendEmailOtp();
        } else {
            verifyOtp();
        }
    }

    return (
        <PopupModal
            modalVisible={loginPopup}
            setModalVisible={setLoginPopup}
        >
            <View style={{ paddingBottom: '15%', width: '100%' }}>
                {!otpSent ?
                    <View>
                        <Text style={styles.popupTxt}>
                            This will take just a few seconds.
                        </Text>
                        <TextInput
                            placeholder="Enter your Email ID"
                            style={styles.inputBoxes}
                            placeholderTextColor={hex.nineSix}
                            inputMode="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus={true}
                            onChangeText={setEmail}
                            value={email}
                            onSubmitEditing={sendEmailOtp}
                        />
                    </View> :
                    <View>
                        <Text style={styles.popupTxt}>
                            Please enter the OTP sent to
                            <Text
                                onPress={() => setOtpSent(false)}
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {'\n' + email + ' '}
                                <Text style={{
                                    fontWeight: 400, fontSize: 12,
                                    color: hex.sixtyNine,
                                }}>
                                    Edit
                                </Text>
                            </Text>
                        </Text>
                        <TextInput
                            placeholder="Enter OTP"
                            style={styles.inputBoxes}
                            placeholderTextColor={hex.nineSix}
                            inputMode="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus={true}
                            onChangeText={setOtp}
                            value={otp}
                            onSubmitEditing={_onPopupSubmit}
                        />
                    </View>
                }
                {validationMsg.length > 0 ?
                    <Text style={[styles.popupTxt, {
                        color: hex.red, fontSize: 14
                    }]}>
                        {' ' + validationMsg}
                    </Text> : null
                }
                {infoTxt.length > 0 ?
                    <Text style={[styles.popupTxt, {
                        color: hex.sixtyNine, fontSize: 14
                    }]}>
                        {' ' + infoTxt}
                    </Text> : null
                }
                <Pressable
                    style={styles.popupSmtBtn}
                    onPress={() => _onPopupSubmit()}
                    disabled={isWorking}
                >
                    <Text style={[styles.popupTxt, {
                        marginBottom: 0,
                    }]}>
                        {otpSent ? "Verify OTP" : "Send OTP"}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setLoginPopup(false)}
                    style={styles.closeBtn}
                >
                    <Text>❌</Text>
                </Pressable>
            </View>
        </PopupModal>
    )
}

export default LoginPopup;


const styles = StyleSheet.create({
    inputBoxes: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 400,
        color: hex.black,
        marginTop: 25,
        marginBottom: 15,
    },
    popupTxt: {
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 400,
        color: hex.black,
        marginBottom: 10,
    },
    popupSmtBtn: {
        backgroundColor: hex.background2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        paddingHorizontal: 15,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        alignSelf: "flex-end",
    },
    closeBtn: {
        position: "absolute",
        top: -15,
        right: -10,
    }
});