import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import SourroundingContainer from "../components/common/SourroundingContainer";
import HeaderBar from "../components/common/HeaderBar";
import axios from "axios";
import ListCard from "../components/ListingViews/ListCard";
import env from "react-dotenv";

const SingleList = ({ route, navigation }) => {

    const { listId } = route.params;

    const [listDetails, setListDetails] = useState({});

    useEffect(() => {
        getListDetails();
    }, []);

    const getListDetails = () => {
        axios.get(`${env.API_URL}/getlist`, {
            params: {
                listId: listId
            }
        }).then(res => {
            const listRes = res.data;
            setListDetails(listRes[0]);
            console.log('listRes', listRes)
        }
        ).catch(err => console.log(err));
    }

    return (
        <SourroundingContainer>
            <HeaderBar title={'Shared List'} />
        <View style={{ 
            flex: 1, 
            width: '95%',
            marginTop: 15
            }}>
            <ListCard enableShare
                item={listDetails}
            />
        </View>
        </SourroundingContainer>
    );
}

export default SingleList;