import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { hex } from "../colors";
import PointsInputRow from "./PointsInputRow";

const CreateLilist = ({ updateLists }) => {
    const [listPoints, setListPoints] = useState([]);
    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [validationMsg, setValidationMsg] = useState('');

    useEffect(() => {
        setValidationMsg(msg => msg.length ? '' : msg);
    }, [listPoints, listTitle, listDescription]);

    const updatePointText = (text, index) => {
        let temp = [...listPoints];
        temp[index] = text;
        setListPoints(temp);
    };

    const addEmptyPoint = () => {
        if (listPoints[listPoints.length - 1] !== '') {
            let temp = [...listPoints];
            temp.push('');
            setListPoints(temp);
        }
    };

    const removePoint = (index) => {
        let temp = [...listPoints];
        temp.splice(index, 1);
        setListPoints(temp);
    };

    const validateList = (isDraft) => {
        const minChar = 10;
        const isComplete = (
            listTitle.length >= 10 &&
            listDescription.length >= 10 &&
            listPoints.length > 0 &&
            listPoints[listPoints.length - 1] !== ''
        )

        if (isComplete) {
            storeData(isDraft);
        } else {
            const validationMsg = (
                listPoints.length === 0 ? 'Please add at least one point to the list' :
                    listPoints[listPoints.length - 1] === '' ? 'Please complete or remove the last point' :
                        listTitle.length < minChar ? `Please enter a title with at least ${minChar} characters` :
                            listDescription.length < minChar ? `Please enter a description with at least ${minChar} characters` :
                                'Oops! Something went wrong. Please try again.'
            );

            setValidationMsg(validationMsg);
            return false;
        }
    }

    const storeData = async (isDraft) => {
        const list = {
            title: listTitle,
            description: listDescription,
            points: listPoints,
            isDraft: isDraft,
        };

        const updating = await updateLists(list);
        updating && resetForm();
    };

    const resetForm = () => {
        setListPoints([]);
        setListTitle('');
        setListDescription('');
    };

    return (
        <View>
            <View style={styles.listCreationVue}>
                <View style={styles.textInputContVue}>
                    <TextInput
                        placeholder="Title of the list"
                        placeholderTextColor={hex.nineSix}
                        style={styles.listCreationTitle}
                        onChangeText={setListTitle}
                        value={listTitle}
                    />
                    <View style={styles.seperatorLine} />
                    <TextInput
                        placeholder="A short description of what it's about..."
                        placeholderTextColor={hex.nineSix}
                        style={styles.listCreationSubTitle}
                        multiline={true}
                        onChangeText={setListDescription}
                        value={listDescription}
                    />
                </View>

                {listPoints.map((listPoint, index) => {
                    return (
                        <PointsInputRow
                            key={index}
                            value={listPoint} index={index}
                            updatePointText={updatePointText}
                            removePoint={removePoint}
                        />
                    )
                }
                )}

                {listPoints[listPoints.length - 1] !== '' ?
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => addEmptyPoint()}
                        style={[styles.textInputContVue, styles.listPointInput]}>
                        <Text style={styles.pointIndexNo}>➕</Text>
                        <Text style={[styles.listCreationPoint, {
                            fontWeight: 500,
                        }]}>
                            Add {listPoints.length ? 'more ' : ''}points to list
                        </Text>
                    </TouchableOpacity> : <View />}

                {!!validationMsg.length ?
                    <View style={styles.validationMsgCont}>
                        <Text style={[styles.listCreationPoint, {
                            fontWeight: 500,
                            color: hex.red,
                        }]}>
                            ⚠️ {validationMsg}
                        </Text>
                    </View> : <View />}

                <View style={styles.actionButtonsVue}>
                    <TouchableOpacity
                        onPress={() => validateList()}
                        style={styles.actionButtons}>
                        <Text style={styles.actionButtonsText}>
                            Publish List  ✔
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => validateList(true)}
                        style={[styles.actionButtons, {
                            backgroundColor: hex.background3,
                        }]}>
                        <Text style={styles.actionButtonsText}>
                            Save as draft  📁
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.listingAllListsTxt}>
                Published Lists 📝
            </Text>
        </View>
    );
}

export default CreateLilist;

export const styles = StyleSheet.create({
    listCreationVue: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        borderColor: hex.greyWhite,
        borderWidth: 1,
    },
    textInputContVue: {
        width: "100%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: hex.greyWhite,
    },
    seperatorLine: {
        width: "100%",
        height: 0.5,
        backgroundColor: hex.greyWhite,
        marginVertical: 10,
    },
    listCreationTitle: {
        width: "100%",
        fontSize: 19,
        fontFamily: 'Livvic',
        fontWeight: 600,
        outlineWidth: 0,
        marginHorizontal: 5,
    },
    listCreationSubTitle: {
        width: "100%",
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 500,
        outlineWidth: 0,
        marginHorizontal: 5,
        color: hex.sixtyNine,
    },
    listCreationPoint: {
        width: "100%",
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 400,
        outlineWidth: 0,
        marginHorizontal: 5,
        color: hex.black,
        alignItems: "center",
    },
    pointIndexNo: {
        fontSize: 14,
        fontFamily: 'Livvic',
        fontWeight: 600,
        marginRight: 5,
    },
    listPointInput: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        borderColor: hex.greyWhite,
    },
    actionButtonsVue: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    actionButtons: {
        width: "49%",
        padding: 5,
        borderRadius: 10,
        backgroundColor: hex.background2,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: hex.greyWhite,
    },
    actionButtonsText: {
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 500,
        color: hex.black,
    },
    validationMsgCont: {
        width: "100%",
        marginTop: 10,
        marginBottom: -10,
    },
    listingAllListsTxt: {
        fontSize: 20,
        fontFamily: 'Livvic',
        fontWeight: 600,
        color: hex.black,
        marginTop: 25,
    },
});