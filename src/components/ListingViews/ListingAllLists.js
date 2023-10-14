import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { hex } from "../colors";
import ListCard from "./ListCard";
import env from "react-dotenv";
import axios from "axios";
import Footer from "../HeaderFooter/Footer";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ListingAllLists = forwardRef((props, ref) => {
    const { userObj, ListHeader, draftedLists } = props;

    const [allLists, setAllLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const canLoadMore = useRef(false);

    useImperativeHandle(ref, () => ({
        updateLists: () => {
            getAllPosts();
        }
    }));

    // useFocusEffect(
    //     useCallback(() => {
    //         userObj && getAllPosts(userObj?._id);
    //     }, [userObj])
    // );

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getAllPosts();
        }
    }, [userObj, isFocused]);

    const getAllPosts = (loadMore, refresh) => {
        canLoadMore.current = false;
        refresh && setIsLoading(2);
        const userId = userObj?._id;
        console.log('draftedLists', draftedLists)
        const apiPath = userId ? `/getuserlist` : "/getall";
        axios.get(`${env.API_URL}${apiPath}`,
            {
                params: {
                    userId: userId, isDraft: !!draftedLists,
                    offset: loadMore ? allLists.length : 0,
                    limit: 5,
                }
            }

        )
            .then(res => {
                const listRes = res.data;
                const listArr = loadMore ? [...allLists, ...listRes] : listRes;
                setAllLists(listArr);
                canLoadMore.current = listRes.length === 5;
            })
            .catch(err => {
                console.log(err);
                canLoadMore.current = false;
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const Placeholder = () => {
        return (
            <View>
                {isLoading ?
                    <ActivityIndicator style={{ marginVertical: 50 }}
                        size="small" color={hex.black} /> :
                    allLists.length === 0 ?
                        <View style={[styles.headerView, {
                            marginTop: 15,
                        }]}>
                            <Text style={styles.listTitle}>No lists published yet.</Text>
                            <View style={styles.seperatorLine} />
                            <Text style={styles.listSubTitle}>Publish your first list here now!</Text>
                        </View> : null}
                <Footer />
            </View>
        )
    }

    return (
        <View style={styles.listingAllLists}>
            <FlatList
                data={allLists}
                contentContainerStyle={{
                    padding: 15
                }}
                renderItem={({ item, index }) => (
                    <ListCard enableShare
                        item={{ ...item, userObj: userObj }}
                        index={index}
                        updateLists={() => getAllPosts(userObj?._id)}
                    />)}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<Placeholder />}
                ListHeaderComponent={ListHeader || null}
                showsHorizontalScrollIndicator={false}
                onEndReached={() => canLoadMore.current && getAllPosts(true)}
            // onEndReachedThreshold={0.5}
            />
        </View>
    );
})

export default ListingAllLists;

const styles = StyleSheet.create({
    listingAllLists: {
        width: "100%",
        marginTop: 5,
        flex: 1,
    },
    listingAllListsTxt: {
        fontSize: 20,
        fontFamily: 'Livvic',
        fontWeight: 600,
        color: hex.black,
    },
    headerView: {
        width: "100%",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: hex.greyWhite,
    },
    seperatorLine: {
        width: "100%",
        height: 1,
        backgroundColor: hex.greyWhite,
        marginTop: 10,
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
        paddingTop: 20,
        padding: 15,
        marginTop: -25,
        backgroundColor: 'white',
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        elevation: 5,
        zIndex: -1,
    },
});