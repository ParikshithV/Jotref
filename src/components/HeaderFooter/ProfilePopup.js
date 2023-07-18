import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import PopupModal from "../common/PopupModal";
import { hex } from "../colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePopup = (props) => {
    const { profilePopup, setProfilePopup, user } = props;

    const navigation = useNavigation();

    const handleLogout = () => {
        AsyncStorage.removeItem("jotrefUser");
        setProfilePopup(false);
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
    }

    return (
        <PopupModal
            modalVisible={profilePopup}
            setModalVisible={setProfilePopup}
        >
            <View style={styles.closeBtnCont}>
                <Text
                    onPress={() => setProfilePopup(false)} >
                    ❌
                </Text>
            </View>
            <View style={styles.profilePopup}>
                <Pressable style={styles.profilePopupBtns}
                    onPress={() => {
                        setProfilePopup(false);
                        navigation.navigate("MyLists", {
                            userObj: user,
                        });
                    }}>
                    <Text style={styles.profilePopupTxt}>
                        My Lists
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => handleLogout()}
                    style={[styles.profilePopupBtns, {
                        backgroundColor: hex.buttonBg2,
                    }]}>
                    <Text style={styles.profilePopupTxt}>
                        Logout
                    </Text>
                </Pressable>
            </View>
        </PopupModal>
    )
};

export default ProfilePopup;

const styles = StyleSheet.create({
    profilePopup: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 50,
    },
    profilePopupBtns: {
        width: "48%",
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: hex.greyWhite,
        borderRadius: 10,
        backgroundColor: hex.buttonBg
    },
    profilePopupTxt: {
        fontSize: 16,
        color: hex.black,
        fontFamily: 'Livvic',
        fontWeight: 400,
    },
    closeBtnCont: {
        width: "100%",
        alignItems: 'flex-end',
        paddingRight: 10,
        marginBottom: 35,
        marginTop: -5,
        marginRight: -15,
    }
});