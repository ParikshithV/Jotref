import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Share, Pressable } from "react-native";
import { hex } from "../colors";
import { ConfCheck, DeleteIcon, ExpandDown, ExpandUp, ShareIcon } from "../../AllSvg";
import moment from "moment";
import PopupModal from "../common/PopupModal";
import axios from "axios";
import env from "react-dotenv";

const ListCard = ({ item, index, updateLists }) => {
    const [showList, setShowList] = useState(false);
    const [deleteConfModal, setDeleteConfModal] = useState(false);
    const [deleteDoneMsg, setDeleteDoneMsg] = useState(false);

    const userEmail = item.createdBy.email || item.userObj.email;

    const editAccess = item.userObj && item.userObj._id === item.createdBy;

    const handleDeleteList = () => {
        axios.delete(`${env.API_URL}/deletelist`, {
            data: {
                listId: item._id,
            }
        })
            .then(res => {
                console.log(res.data);
                setDeleteConfModal(false);
                setDeleteDoneMsg(true);
                setTimeout(() => {
                    setDeleteDoneMsg(false);
                }, 2000);
                setTimeout(() => {
                    updateLists();
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                setDeleteConfModal(false);
            })
    }

    const DeleteConfModal = () => {
        return (
            <PopupModal
                modalVisible={deleteConfModal}
                setModalVisible={setDeleteConfModal}
            >
                <Text style={styles.modalTxt}>
                    Are you sure you want to delete this list?
                </Text>
                <View style={styles.modalBtnsCont}>
                    <TouchableOpacity
                        onPress={() => setDeleteConfModal(false)}
                        style={[styles.modalBtn, {
                            backgroundColor: hex.buttonBg2,
                        }]}
                    >
                        <Text style={styles.modalBtnTxt}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteList()}
                        style={[styles.modalBtn, {
                            backgroundColor: hex.buttonBg,
                        }]}
                    >
                        <Text style={styles.modalBtnTxt}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupModal>
        )
    }

    const DeleteConfMsg = useCallback(() => {
        return (
            <PopupModal
                modalVisible={deleteDoneMsg}
                setModalVisible={setDeleteDoneMsg}
            >
                <ConfCheck
                    height={75}
                    width={75}
                    color={hex.green}
                />
                <Text style={[styles.modalTxt, {
                    marginBottom: 75, marginTop: 15,
                }]}>
                    List deleted successfully!
                </Text>
            </PopupModal>
        )
    }, [deleteDoneMsg])

    const shareList = async () => {
        console.log("share list", item._id);
        const shareUrl = env.API_URL + "?listId=" + item._id;
        const shareMsg = `Check out this list on Jotref`;
        try {
            const result = await navigator.share({
                title: "Jotref List",
                text: shareMsg,
                url: shareUrl,
            });
            if (result) {
                console.log("shared");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View key={index}
            style={styles.listCard}>
            <DeleteConfModal />
            <DeleteConfMsg />
            <View style={styles.headerView}>
                {editAccess ?
                    <View style={styles.editAccessCont}>
                        <Text style={[styles.userIdTxt, {
                            fontSize: 14, marginBottom: 0,
                        }]}>
                            {moment(item.createdOn).format("MMM D, YYYY H:mm")}
                        </Text>
                        <Pressable
                            onPress={() => setDeleteConfModal(true)}
                            style={styles.deleteBtnOuter}
                        >
                            <DeleteIcon
                                height={15}
                                width={18}
                            />
                        </Pressable>
                    </View> : null}
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={[styles.userIdTxt, {
                    color: hex.buttonBg,
                }]}>{userEmail}</Text>
                <View style={styles.seperatorLine} />
                <Text style={styles.listSubTitle}>{item.description}</Text>
            </View>
            {showList ?
                <View style={styles.pointsCont}>
                    {item.points.map((point, index) => {
                        return (
                            <View key={index}
                                style={[styles.listPointRow, {
                                    borderTopWidth: index === 0 ? 0 : 1,
                                }]}>
                                <Text style={styles.pointIndexNo}>{index + 1}.</Text>
                                <Text style={styles.listPoint}>{point}</Text>
                            </View>
                        )
                    })}
                    <View
                        style={[styles.hideShowBtnCont, {
                            justifyContent: "flex-end",
                        }]}
                    >
                        <TouchableOpacity onPress={() => shareList()}>
                            <ShareIcon height={18} width={18} fill={hex.nineSix} />
                        </TouchableOpacity>
                        <View style={{ width: 15 }} />
                        <TouchableOpacity onPress={() => setShowList(false)}>
                            <ExpandUp height={25} width={25} fill={hex.nineSix} />
                        </TouchableOpacity>
                    </View>
                </View> :
                <View
                    style={[styles.pointsCont, styles.hideShowBtnCont, {
                        paddingBottom: 5,
                    }]}
                >
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => setShowList(true)}>
                        <Text
                            style={styles.showHideBtnTxt}>
                            Show list
                        </Text>
                        <ExpandDown height={15} width={15} fill={hex.nineSix} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default ListCard;

const styles = StyleSheet.create({
    listingAllLists: {
        width: "100%",
        marginVertical: 25,
    },
    listCard: {
        width: "100%",
        marginVertical: 15,
        elevation: 5,
    },
    headerView: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
    },
    listTitle: {
        width: "100%",
        fontSize: 19,
        fontFamily: 'Livvic',
        fontWeight: 600,
        outlineWidth: 0,
        marginHorizontal: 5,
    },
    listSubTitle: {
        width: "100%",
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 500,
        outlineWidth: 0,
        marginHorizontal: 5,
        marginTop: 8,
        color: hex.sixtyNine,
    },
    listPoint: {
        width: "100%",
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 400,
        outlineWidth: 0,
        marpointsContginHorizontal: 5,
        color: hex.black,
        alignItems: "center",
    },
    pointIndexNo: {
        fontSize: 14,
        fontFamily: 'Livvic',
        fontWeight: 600,
        marginRight: 5,
    },
    listPointRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderTopColor: hex.greyWhite,
        borderTopWidth: 1,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderStyle: "dashed",
    },
    pointsCont: {
        paddingTop: 18,
        padding: 15,
        marginTop: -25,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        elevation: 5,
        zIndex: -1,
        borderWidth: 1,
        borderColor: hex.greyWhite,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
    },
    showHideBtnTxt: {
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        fontFamily: 'Livvic',
        marginRight: 5,
        color: hex.nineSix
    },
    userIdTxt: {
        fontSize: 12,
        fontFamily: 'Livvic',
        fontWeight: 500,
        outlineWidth: 0,
        marginLeft: 5,
        marginBottom: 5,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    seperatorLine: {
        width: "100%",
        height: 1,
        backgroundColor: hex.greyWhite,
        marginVertical: 5,
    },
    hideShowBtnCont: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: -10,
    },
    editAccessCont: {
        alignItems: 'center',
        flexDirection: "row",
        marginTop: -5,
        marginBottom: 5,
        justifyContent: "space-between",
    },
    deleteBtnOuter: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: hex.greyWhite,
        borderRadius: 100,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.05)',
        backgroundColor: hex.buttonBg2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    modalTxt: {
        fontSize: 16,
        fontFamily: 'Livvic',
        fontWeight: 500,
        textAlign: "center",
        marginBottom: 20,
    },
    modalBtnsCont: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 50,
    },
    modalBtn: {
        width: "48%",
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: hex.greyWhite,
        borderRadius: 10,
    },
    modalBtnTxt: {
        fontSize: 16,
        color: hex.black,
        fontFamily: 'Livvic',
        fontWeight: 400,
    },
});