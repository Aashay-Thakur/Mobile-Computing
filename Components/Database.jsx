import {
  TextInput,
  View,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Button,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import firestore from "@react-native-firebase/firestore";

const ref = firestore().collection("data");

function Item({ id, title }) {
  async function deleteTask() {
    try {
      await ref.doc(id).delete();
    } catch (error) {
      console.log("Error Deleting Item => ", error);
      ToastAndroid.show("Error deleting task", 3000);
    }
  }

  return (
    <View style={itemStyles.taskContainer}>
      <View>
        <Text style={itemStyles.taskText}>{title}</Text>
      </View>
      <Pressable onPress={() => deleteTask()}>
        <FontAwesomeIcon icon={faTrash} color="#ff3333" size={20} />
      </Pressable>
    </View>
  );
}

const Database = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title } = doc.data();
        list.push({
          id: doc.id,
          title,
        });
      });

      setData(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addData() {
    if (textInput === "") return ToastAndroid.show("Please enter something", 3000);
    if (textInput.length > 15) return ToastAndroid.show("String too long", 3000);
    await ref.add({
      title: textInput,
    });
    setTextInput("");
  }

  if (loading) {
    return (
      <View style={appStyles.loadingContainer}>
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  return (
    <View style={appStyles.mainContainer}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
      <TextInput label={"New Todo"} value={textInput} onChangeText={setTextInput} style={appStyles.input} />
      <Button onPress={() => addData()} title="Add Data" color="teal" />
    </View>
  );
};

const itemStyles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: {
    color: "white",
    fontSize: 18,
  },
});

const appStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "teal",
  },
  mainContainer: {
    padding: 10,
    flex: 1,
  },
});

export default Database;
