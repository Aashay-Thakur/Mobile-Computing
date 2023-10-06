import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import keys, { primaryColor, secondaryColor, size } from "./keys";

const Keypad = ({ handleInput }) => {
  const populateKeys = () => {
    return Object.keys(keys).map((key, index) => {
      let keyObject = keys[key];
      return (
        <Pressable
          key={index}
          style={styles.keyContainer}
          android_ripple={{ color: "#888" }}
          onPress={() => handleInput([key, keyObject])}>
          <View>
            {keyObject.isElement ? (
              keyObject.element
            ) : (
              <Text style={{ ...styles.characterText, color: keyObject.color }}>
                {keyObject.character}
              </Text>
            )}
          </View>
        </Pressable>
      );
    });
  };

  return <View style={styles.keypadContainer}>{populateKeys()}</View>;
};

export default Keypad;

const darkTheme = {
  primaryColor: "#1e1e1e",
  backgroundColor: "#000",
  secondaryColor: "#bbb",
  accentColor: "teal",
};

const theme = darkTheme;

const styles = StyleSheet.create({
  keypadContainer: {
    flex: 8,
    backgroundColor: theme.backgroundColor,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyContainer: {
    width: 100 / 4 + "%",
    height: 100 / 5 + "%",
    justifyContent: "center",
    alignItems: "center",
  },
  characterText: {
    fontSize: 30,
  },
});
