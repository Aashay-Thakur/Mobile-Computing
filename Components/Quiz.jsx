import { StyleSheet, FlatList, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import Question from "./Question";
import Result from "./Result";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function Questions({ navigation }) {
	const ref = firestore().collection("questions");

	const [data, setData] = useState([]);
	const [selection, setSelection] = useState({});

	useEffect(() => {
		var list = [];
		ref.get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				list.push({ ...doc.data(), id: doc.id });
			});
		});
		setData(list);
	}, []);

	function onSubmit() {
		navigation.navigate("Result", { data, selection });
	}

	return (
		<View style={styles.mainContainer}>
			<FlatList
				style={{ flex: 1 }}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Question
						{...item}
						setSelection={setSelection}
						selection={selection}
					/>
				)}
			/>
			<Button onPress={onSubmit} title="Submit" color="teal" />
		</View>
	);
}

export default function Quiz() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Questions" component={Questions} />
			<Stack.Screen name="Result" component={Result} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 10,
	},
});
