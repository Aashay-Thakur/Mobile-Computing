import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  Switch,
  Pressable,
  Linking,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Form = () => {
  const [selectedId, setSelectedId] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  const gender = useMemo(
    () => [
      {
        id: "1",
        label: "Male",
        value: "Male",
        color: selectedId === "1" ? "#81b0ff" : "#fff",
        borderColor: selectedId === "1" ? "#81b0ff" : "#fff",
      },
      {
        id: "2",
        label: "Female",
        value: "Female",
        color: selectedId === "2" ? "#81b0ff" : "#fff",
        borderColor: selectedId === "2" ? "#81b0ff" : "#fff",
      },
      {
        id: "3",
        label: "Other",
        value: "Other",
        color: selectedId === "3" ? "#81b0ff" : "#fff",
        borderColor: selectedId === "3" ? "#81b0ff" : "#fff",
      },
    ],
    [selectedId],
  );

  function onRadioChange(e) {
    setSelectedId(e);
  }

  const handleSwitch = () => setIsEnabled(previousState => !previousState);

  const addBrandLogos = () => {
    var brandLogos = [faWhatsapp, faFacebook, faInstagram, faYoutube];
    return brandLogos.map(logo => {
      var url = "";
      if (logo.iconName === "whatsapp") url = "https://www.whatsapp.com";
      else if (logo.iconName === "facebook") url = "https://www.facebook.com";
      else if (logo.iconName === "instagram") url = "https://www.instagram.com";
      else if (logo.iconName === "youtube") url = "https://www.youtube.com";
      return (
        <Pressable
          key={logo.iconName}
          onPress={() => {
            Linking.openURL(url);
          }}>
          <FontAwesomeIcon color="white" icon={logo} size={24} />
        </Pressable>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Form</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="First Name"
              inputMode="text"
              autoComplete="name-given"
              style={styles.nameContainer.textInput}
            />
            <TextInput
              placeholder="Last Name"
              inputMode="text"
              autoComplete="name-family"
              style={styles.nameContainer.textInput}
            />
          </View>
          <TextInput
            placeholder="Email"
            inputMode="email"
            autoComplete="email"
            style={styles.textInput}
          />
          <View style={styles.radioContainer}>
            <RadioGroup
              radioButtons={gender}
              onPress={e => onRadioChange(e)}
              selectedId={selectedId}
              layout="row"
            />
          </View>
          {selectedId === "3" ? (
            <TextInput
              placeholder="Please specify"
              style={styles.textInput}
              autoComplete="gender"
              inputMode="text"
            />
          ) : null}
          <TextInput
            placeholder="State"
            style={styles.textInput}
            inputMode="text"
          />
          <View style={styles.brandContainer}>{addBrandLogos()}</View>
          <View style={styles.adsContainer}>
            <Switch
              onValueChange={handleSwitch}
              value={isEnabled}
              thumbColor={isEnabled ? "#ffffff" : null}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
            <Text>Turn on Personalised Ads?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" style={styles.button} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 12,
    gap: 12,
    textInput: {
      height: 40,
      borderColor: "#fff",
      borderBottomWidth: 1,
      marginBottom: 36,
      width: "50%",
    },
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
    gap: 12,
  },
  adsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
    gap: 12,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: "white",
    marginTop: 12,
  },
  brandContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
    gap: 12,
  },
  brandLogo: {
    width: 24,
    height: 24,
  },
});

export default Form;
