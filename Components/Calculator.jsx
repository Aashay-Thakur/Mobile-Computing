import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import Keypad from "./Keypad";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [operator, setOperator] = useState("");

  useEffect(() => {
    if (input.length === 0) return;
    let splitTerms = /(\d+\.?\d*%?)([+-x÷]?)(\d*\.?\d*%?)/g.exec(input);
    setTerm1(splitTerms[1]);
    setTerm2(splitTerms[3]);
    setOperator(splitTerms[2]);
  }, [input]);

  useEffect(() => {
    if (input.includes("%")) {
      if (term1.includes("%")) {
        let newTerm1 = Number(term1.replace("%", "")) / 100;
        setTerm1(newTerm1.toString());
      }
      if (term2.includes("%")) {
        let newTerm2 = Number(term2.replace("%", "")) / 100;
        if (operator !== "x") {
          if (term1.includes("%"))
            newTerm2 *= Number(term1.replace("%", "") / 100);
          else newTerm2 *= Number(term1);
        }
        setTerm2(newTerm2.toString());
      }
    }

    if (term2.length !== 0) {
      var result = calculate();
      setOutput(result);
    } else if (term2.length === 0) {
      setOutput("");
    }
  }, [term1, operator, term2]);

  function handleInput(key) {
    switch (key[1].type) {
      case "number":
        if (input[input.length - 1] === "%" && term2.length !== 0) return;
        setInput(prev => {
          return prev + key[1].character;
        });
        break;
      case "operator":
        if (input.length === 0) break;
        if (operator === key[1].character) break;
        if (operator.length !== 0) {
          setInput(prev => prev.replace(/\D$/g, key[1].character));
        } else {
          setInput(prev => {
            return prev + key[1].character;
          });
        }
        break;
      case "equals":
        if (term2.length === 0) break;
        setInput(output.toString());
        break;
      case "decimal":
        if (term2.length === 0 && operator !== "") break;
        if (term1.includes(".") && term2.length === 0) break;
        if (term2.includes(".")) break;
        setInput(prev => prev + key[1].character);
        break;
      case "percent":
        if (term2.length === 0 && operator !== "") break;
        if (term1.includes("%") && term2.length === 0) break;
        if (term2.includes("%")) break;
        setInput(prev => prev + key[1].character);
        break;
      case "clear":
        setInput("");
        setOutput("");
        break;
    }
  }

  function calculate() {
    if (operator === "+") return Number(term1) + Number(term2);
    if (operator === "-") return Number(term1) - Number(term2);
    if (operator === "x") return Number(term1) * Number(term2);
    if (operator === "÷") return Number(term1) / Number(term2);
  }

  return (
    <View style={{ ...styles.calculatorContainer }}>
      <View style={styles.displayContainer}>
        <TextInput
          style={{ ...styles.inputBox, fontSize: input.length < 10 ? 48 : 30 }}
          showSoftInputOnFocus={false}
          editable={false}
          onFocus={Keyboard.dismiss()}
          autoComplete="off"
          value={input}
        />
        <View style={styles.outputBox}>
          <Text style={styles.outputText}>{output}</Text>
        </View>
      </View>
      <Pressable
        style={styles.backspaceContainer}
        onPress={() => {
          setInput(input.slice(0, -1));
        }}>
        <FontAwesomeIcon icon={faDeleteLeft} size={30} color="teal" />
      </Pressable>
      <Keypad handleInput={handleInput} />
    </View>
  );
};

export default Calculator;

const darkTheme = {
  primaryColor: "#1e1e1e",
  backgroundColor: "#000",
  secondaryColor: "#bbb",
  accentColor: "teal",
};

const theme = darkTheme;

const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.backgroundColor,
  },
  displayContainer: {
    flex: 2,
    backgroundColor: theme.backgroundColor,
    width: "100%",
    padding: 10,
    paddingRight: 20,
    judtifyContent: "space-between",
    flexDirection: "column",
  },
  inputBox: {
    flex: 2,
    fontSize: 48,
    color: theme.secondaryColor,
    textAlign: "right",
  },
  outputBox: {
    flex: 1,
  },
  outputText: {
    color: theme.secondaryColor,
    fontSize: 30,
    textAlign: "right",
    paddingRight: 10,
  },
  backspaceContainer: {
    backgroundColor: theme.backgroundColor,
    width: "90%",
    height: "max-content",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.accentColor,
  },
});
