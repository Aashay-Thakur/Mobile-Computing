import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import keys, { primaryColor, secondaryColor, size } from "./keys";

const Keypad = ({
  handleInput,
  totalKeysInColumn,
  totalKeysInRow,
  arrayOfKeys = Object.keys(keys),
}) => {
  const populateKeys = () => {
    return arrayOfKeys.map((key, index) => {
      let keyObject = keys[key];
      return (
        <Pressable
          key={index}
          style={{
            ...styles.keyContainer,
            height: 100 / totalKeysInRow + "%",
            width: 100 / totalKeysInColumn + "%",
          }}
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
    justifyContent: "center",
    alignItems: "center",
  },
  characterText: {
    fontSize: 30,
  },
});
