import React, { createRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { hex } from "../components/colors";
import CreateLilist from "../components/listCreation/CreateLilist";
import ListingAllLists from "../components/ListingViews/ListingAllLists";
import axios from "axios";
import env from "react-dotenv";
import HeaderBar from "../components/HeaderFooter/Header";
import SourroundingContainer from "../components/common/SourroundingContainer";
import { useNavigation } from "@react-navigation/native";
import PopupModal from "../components/common/PopupModal";
import { ConfCheck } from "../AllSvg";

const HomeScroll = () => {
    const [tempDb, setTempDb] = useState({});
    const [user, setUser] = useState(null);
    const [addDoneMsg, setDeleteDoneMsg] = useState(false);

    const listingRef = createRef();
    const headerRef = createRef();

    const navigation = useNavigation();

    const updateLists = (list, userIdParam) => {
        let temp = list || tempDb;
        const userId = user?._id || userIdParam;
        const payload = { ...temp, userId: userId };
        console.log(payload);
        axios.post(`${env.API_URL}/post`, payload)
            .then(res => {
                console.log(res);
                refreshListing();
                setDeleteDoneMsg(true);
                setTimeout(() => {
                    setDeleteDoneMsg(false);
                }, 2000);
            })
            .catch(err => console.log(err));
    }

    const ConfPopup = () => {
        return (
            <PopupModal
                modalVisible={addDoneMsg}
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
                    List added successfully!
                </Text>
            </PopupModal>)
    }

    const refreshListing = () => {

        if (tempDb?.title) {
            setTempDb({});
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } else {
            setTimeout(() => {
                listingRef?.current?.updateLists();
            }, 1000);
        }

    }

    const checkAndPost = async (list) => {
        if (user) {
            updateLists(list);
            return true;
        } else {
            setTempDb(list);
            headerRef?.current?.showLoginPopup(true);
            return false;
        }
    }

    return (
        <SourroundingContainer>
            <ConfPopup />
            <HeaderBar
                ref={headerRef}
                postNow={updateLists}
                setUserInHome={setUser}
            />
            <ListingAllLists
                ref={listingRef}
                ListHeader={() => (
                    <CreateLilist updateLists={checkAndPost} />
                )}
            />
        </SourroundingContainer>
    );
}

export default HomeScroll;

const styles = StyleSheet.create({
    devContTxt: {
        width: "100%",
        textAlign: "center",
        fontSize: 12,
        fontFamily: 'Livvic',
        fontWeight: 400,
        color: hex.nineSix,
    }
});