import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import HeaderBar from "./components/HeaderFooter/Header";
import Icon from 'react-native-vector-icons/dist/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScroll from "./pages/HomeScroll";
import DraftLists from "./pages/DraftLists";
import MyLists from "./pages/MyLists";

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    getUrlParams();
  }, []);

  const getUrlParams = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const urlParams = new URLSearchParams(url.search);
    console.log(urlParams);
  };

  return (
    <NavigationContainer
      style={{ alignItems: "center" }}
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
