import { StyleSheet, TextInput, View, ToastAndroid, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import Keypad from "./Keypad";

const TempConverter = () => {
  var arrayOfKeys = [
    "seven",
    "eight",
    "nine",
    "backSpace",
    "four",
    "five",
    "six",
    "clear",
    "one",
    "two",
    "three",
    "up",
    "minusPlus",
    "zero",
    "decimal",
    "down",
  ];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [unit1, setUnit1] = useState("Celcius");
  const [unit2, setUnit2] = useState("Fahrenheit");

  const units = ["Celcius", "Fahrenheit", "Kelvin"];

  function convertTemp(value, from, to) {
    value = parseFloat(value);
    if (from === to) return value;
    switch (from) {
      case "Celcius":
        if (to === "Fahrenheit") return (value * 9) / 5 + 32;
        if (to === "Kelvin") return value + 273.15;
        break;
      case "Fahrenheit":
        if (to === "Celcius") return ((value - 32) * 5) / 9;
        if (to === "Kelvin") return ((value - 32) * 5) / 9 + 273.15;
        break;
      case "Kelvin":
        if (to === "Celcius") return value - 273.15;
        if (to === "Fahrenheit") return ((value - 273.15) * 9) / 5 + 32;
        break;
      default:
        return value;
    }
  }

  useEffect(() => {
    if (input !== "") {
      setOutput(convertTemp(input, unit1, unit2).toString());
    }
  }, [input, unit1, unit2]);

  function handleInput(e) {
    switch (e[0]) {
      case "clear":
        setInput("");
        setOutput("");
        break;
      case "backSpace":
        setInput(input.slice(0, -1));
        break;
      case "decimal":
        if (input.includes(".")) break;
        setInput(prev => prev + ".");
        break;
      case "minusPlus":
        input.includes("-")
          ? setInput(input.slice(1))
          : setInput(prev => "-" + prev);
        break;
      case "up":
      case "down":
        ToastAndroid.show("Not Implemented", ToastAndroid.SHORT);
        break;
      default:
        setInput(prev => prev + e[1].character);
        break;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ ...styles.inputContainers, borderBottomColor: "teal" }}>
        <SelectDropdown
          data={units}
          defaultValueByIndex={0}
          onSelect={selectedItem => {
            setUnit1(selectedItem);
          }}
          buttonStyle={{ ...styles.selectButton, borderBottomColor: "teal" }}
          buttonTextStyle={{ color: "#888" }}
          rowStyle={styles.dropDownRow}
          rowTextStyle={{ color: "#888" }}
          dropdownStyle={styles.dropDown}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginEnd: 10,
          }}>
          <TextInput
            style={styles.inputs}
            keyboardType="numeric"
            inputMode="numeric"
            value={input}
            editable={false}
          />
          <Text style={{ fontSize: 25 }}>
            {unit1 !== "Kelvin" ? "\u00b0" + unit1[0] : "K"}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainers}>
        <SelectDropdown
          data={units}
          defaultValueByIndex={1}
          onSelect={selectedItem => {
            setUnit2(selectedItem);
          }}
          buttonStyle={styles.selectButton}
          buttonTextStyle={{ color: "#888" }}
          rowStyle={styles.dropDownRow}
          rowTextStyle={{ color: "#888" }}
          dropdownStyle={styles.dropDown}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginEnd: 10,
          }}>
          <TextInput
            style={styles.inputs}
            keyboardType="numeric"
            inputMode="numeric"
            value={output}
            editable={false}
          />
          <Text style={{ fontSize: 25 }}>
            {unit2 !== "Kelvin" ? "\u00b0" + unit2[0] : "K"}
          </Text>
        </View>
      </View>
      <View style={styles.keypadContainer}>
        <Keypad
          totalKeysInRow={4}
          totalKeysInColumn={4}
          arrayOfKeys={arrayOfKeys}
          handleInput={handleInput}
        />
      </View>
    </View>
  );
};

export default TempConverter;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainers: {
    flex: 1,
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    justifyContent: "space-around",
  },
  inputs: {
    fontSize: 30,
    textAlign: "right",
    paddingRight: 20,
    color: "#fff",
  },
  keypadContainer: {
    flex: 3,
  },
  selectButton: {
    backgroundColor: "#000",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    height: 30,
  },
  dropDownRow: {
    backgroundColor: "#222",
    borderColor: "#000",
  },
});
