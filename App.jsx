import "react-native-gesture-handler";

import React from "react";
import { View, StyleSheet } from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Form from "./Components/Form";

const Drawer = createDrawerNavigator();

const Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ffffff",
    background: "#1e1e1e",
    card: "#1e1e1e",
    text: "#ffffff",
    border: "#ffffff",
    notification: "#ffffff",
  },
};

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Drawer.Navigator
        initialRouteName="Form"
        screenOptions={{ headerTintColor: "#fff" }}>
        <Drawer.Screen name="Form" component={Form} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
