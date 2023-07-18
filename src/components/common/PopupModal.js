import React from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { hex } from "../colors";

const PopupModal = ({ modalVisible, setModalVisible, children }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalView}>
                <View style={styles.centeredView}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

export default PopupModal;

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    centeredView: {
        width: '100%',
        maxWidth: 675,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        padding: 25,
        alignItems: "center",
        shadowColor: hex.black,
        boxShadow: '0px 0px 500px rgba(0, 0, 0, 0.25)',
    }
});