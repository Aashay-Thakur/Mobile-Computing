import React from "react";
import firestore from "@react-native-firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";

function Todo({ id, title, complete }) {
  async function toggleComplete() {
    try {
      await firestore().collection("tasks").doc(id).update({
        complete: !complete,
      });
    } catch (error) {
      console.log("Error toggling complete status", error);
    }
  }

  async function deleteTask() {
    try {
      await firestore().collection("tasks").doc(id).delete();
    } catch (error) {
      console.log("Error deleting task", error);
    }
  }

  return (
    <View style={styles.taskContainer}>
      <Pressable onPress={() => toggleComplete()}>
        <FontAwesomeIcon
          icon={complete ? faCheck : faXmark}
          color={complete ? "teal" : "white"}
          size={30}
        />
      </Pressable>
      <View>
        <Text style={styles.taskText}>{title}</Text>
      </View>
      <Pressable onPress={() => deleteTask()}>
        <FontAwesomeIcon icon={faTrash} color="#ff3333" size={20} />
      </Pressable>
    </View>
  );
}

export default React.memo(Todo);

const styles = StyleSheet.create({
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
