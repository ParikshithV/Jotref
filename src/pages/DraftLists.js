import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SourroundingContainer from "../components/common/SourroundingContainer";
import HeaderBar from "../components/common/HeaderBar";
import ListingAllLists from "../components/ListingViews/ListingAllLists";

const DtaftLists = (props) => {
    const { navigation, route } = props;

    const userObj = route.params?.userObj;
    const draftedLists = route.params?.draftedLists;

    return (
        <SourroundingContainer >
            <HeaderBar title={'Drafted Lists'} />
            <ListingAllLists userObj={userObj} draftedLists={true} />
        </SourroundingContainer>
    );
}

export default DtaftLists;

const styles = StyleSheet.create({});