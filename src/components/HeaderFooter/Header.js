import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { hex } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPopup from "./LoginPopup";
import { useNavigation } from "@react-navigation/native";
import ProfilePopup from "./ProfilePopup";

const HeaderBar = forwardRef((props, ref) => {
    const { postNow, setUserInHome } = props;

    const [loginPopup, setLoginPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserPosting, setIsUserPosting] = useState(false);
    const [profilePopup, setProfilePopup] = useState(false);

    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
        showLoginPopup: (isUserPosting) => {
            setLoginPopup(true);
            setIsUserPosting(isUserPosting);
        }
    }));

    useEffect(() => {
        checkForLogin();
    }, []);

    const checkForLogin = async () => {
        const user = await AsyncStorage.getItem("jotrefUser");
        if (user) {
            const parsedUser = JSON.parse(user);
            console.log("User logged in");
            setUser(parsedUser);
            setUserInHome(parsedUser);
            isUserPosting && postNow(null, parsedUser._id);
        } else {
            console.log("User not logged in");
        }
    }

    const navigateToDrafts = () => {
        user?._id ?
            navigation.navigate("Drafts", {
                userObj: user
            }) :
            setLoginPopup(true);
    }

    return (
        <View style={styles.headerBar}>
            <Text style={styles.headerTxt}>
                Jotref
            </Text>
            {!user?._id ?
                <Text
                    onPress={() => setLoginPopup(true)}
                    style={[styles.headerSideTxt, {
                        color: hex.green,
                    }]}>
                    Login
                </Text> :
                <Text
                    onPress={() => setProfilePopup(true)}
                    numberOfLines={1}
                    style={[styles.headerSideTxt, {
                        color: hex.nineSix,
                        width: '35%',
                    }]}>
                    {user?.email}
                </Text>
            }

            <Pressable 
                onPress={() => navigateToDrafts()}
                style={styles.sideBtn}>
                <Text
                    style={[styles.headerSideTxt, {
                        color: hex.blue
                    }]}>📁</Text>
            </Pressable>

            <LoginPopup
                loginPopup={loginPopup}
                setLoginPopup={setLoginPopup}
                checkForLogin={checkForLogin}
            />

            <ProfilePopup
                profilePopup={profilePopup}
                setProfilePopup={setProfilePopup}
                user={user}
            />
        </View>
    );
})

export default HeaderBar;

const styles = StyleSheet.create({
    headerBar: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.05)',
        paddingHorizontal: 15,
    },
    headerTxt: {
        fontSize: 21,
        fontFamily: 'Livvic',
        fontWeight: 600,
        color: hex.black,
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    },
    headerCont: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        backgroundColor: hex.background2,
        borderRadius: 5,
    },
    headerSideTxt: {
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 500,
        decorationLine: "underline",
    },
    sideBtn: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: hex.background3,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        paddingLeft: 2,
        elevation: 5,
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
    },
});