import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BackArrow } from "../../AllSvg";
import { Pressable } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { hex } from "../colors";

const HeaderBar = (props) => {
    const { title } = props;

    const navigation = useNavigation();

    return (
        <View style={styles.headerCont}>
            <Text
                style={styles.titleTxt}
            >
                {title}
            </Text>
            <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
            >
                <BackArrow />
            </Pressable>
            <View />
        </View>
    )
};

export default HeaderBar;

const styles = StyleSheet.create({
    headerCont: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: hex.greyWhite,
    },
    backBtn: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: hex.greyWhite,
        borderRadius: 100,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.05)',
    },
    titleTxt: {
        fontSize: 18,
        fontFamily: 'Livvic',
        fontWeight: 500,
        color: hex.black,
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    }
})