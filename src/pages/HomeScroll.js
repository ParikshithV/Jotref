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

const HomeScroll = () => {
    const [tempDb, setTempDb] = useState({});
    const [user, setUser] = useState(null);

    const listingRef = createRef();
    const headerRef = createRef();

    const navigation = useNavigation();

    const updateLists = (list, userIdParam) => {
        let temp = list || tempDb;
        const userId = user?.token || userIdParam;
        const payload = { ...temp, userId: userId };
        console.log(payload);
        axios.post(`${env.API_URL}/post`, payload)
            .then(res => {
                console.log(res);
                refreshListing();
            })
            .catch(err => console.log(err));
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

    const checkAndPost = (list) => {
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