import React from "react";
import { StyleSheet, Text } from "react-native";
import { hex } from "../colors";

const Footer = () => {
    return (
        <Text style={styles.devContTxt}>
            jotref@parikshithv.in
        </Text>
    )
}

export default Footer;

const styles = StyleSheet.create({
    devContTxt: {
        width: "100%",
        textAlign: "center",
        fontSize: 12,
        fontFamily: 'Livvic',
        fontWeight: 400,
        color: hex.nineSix,
        marginTop: 25
    }
});