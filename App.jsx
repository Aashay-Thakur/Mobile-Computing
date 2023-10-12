import "react-native-gesture-handler";

import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Form from "./Components/Form";
import Calculator from "./Components/Calculator";
import TempConverter from "./Components/TempConverter";

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
        initialRouteName="Temperature Converter"
        screenOptions={{ headerTintColor: "#fff" }}>
        <Drawer.Screen name="Form" component={Form} />
        <Drawer.Screen name="Calculator" component={Calculator} />
        <Drawer.Screen name="Temperature Converter" component={TempConverter} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
