import {
  TextInput,
  View,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import Task from "./Task";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const ref = firestore().collection("tasks");

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTasks(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addTask() {
    if (task === "") return ToastAndroid.show("Please enter a task", 3000);
    if (task.length > 15) return ToastAndroid.show("Task too long", 3000);
    await ref.add({
      title: task,
      complete: false,
    });
    setTask("");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{ flex: 1 }}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Task {...item} />}
      />
      <TextInput
        label={"New Todo"}
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button onPress={() => addTask()} title="Add TODO" color="teal" />
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
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
