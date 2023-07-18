import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SourroundingContainer from "../components/common/SourroundingContainer";
import HeaderBar from "../components/common/HeaderBar";
import ListingAllLists from "../components/ListingViews/ListingAllLists";

const MyLists = (props) => {
    const { navigation, route } = props;

    const userObj = route.params?.userObj;

    return (
        <SourroundingContainer >
            <HeaderBar title={'My Lists'} />
            <ListingAllLists userObj={userObj} />
        </SourroundingContainer>
    );
}

export default MyLists;

const styles = StyleSheet.create({});