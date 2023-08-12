import React, { createRef, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import HeaderBar from "./components/HeaderFooter/Header";
import Icon from 'react-native-vector-icons/dist/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScroll from "./pages/HomeScroll";
import DraftLists from "./pages/DraftLists";
import MyLists from "./pages/MyLists";
import SingleList from "./pages/SingleList";

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    getUrlParams();
  }, []);

  const navigationRef = useRef();

  const getUrlParams = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const urlParams = new URLSearchParams(url.search);
    const listId = urlParams.get('listid');
    console.log('listId', listId);
    if (listId) {
      navigationRef.current?.navigate('SingleList', { listId: listId });
    }
  };

  return (
    <NavigationContainer
      style={{ alignItems: "center" }}
      ref={navigationRef}
    >
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home" component={HomeScroll}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Drafts" component={DraftLists}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyLists" component={MyLists}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SingleList" component={SingleList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    // alignItems: "center",
    width: "100%",
  },
});

export default App;
