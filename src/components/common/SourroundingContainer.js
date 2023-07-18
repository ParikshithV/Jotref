import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { hex } from "../colors";

const SourroundingContainer = ({ children, noPadding }) => {
    return (
        <View style={styles.app}>
            <View style={styles.centerView}>
                {children}
            </View>
        </View>
    )
}

export default SourroundingContainer;

const styles = StyleSheet.create({
    app: {
        flex: 1,
        alignItems: "center",
        width: "100%",
    },
    centerView: {
        flex: 1,
        backgroundColor: 'white',
        width: "100%",
        maxWidth: 675,
        minHeight: "100%",
        paddingBottom: 0,
        alignItems: "center",
        borderColor: hex.greyWhite,
        // borderWidth: 2,
        elevation: 15,
        borderRightWidth: 2,
        borderLeftWidth: 2,
    },
});
