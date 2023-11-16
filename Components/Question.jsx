import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Question = ({ question, options, id, setSelection, selection }) => {
	function onOptionSelect(option, index) {
		setSelection(prev => {
			return {
				...prev,
				[id]: {
					option,
					index,
				},
			};
		});
	}

	return (
		<View style={styles.questionContainer}>
			<View style={styles.questionView}>
				<Text style={styles.questionText}>{question}</Text>
			</View>
			<View style={styles.optionsContainer}>
				{options.map((option, i) => {
					return (
						<Pressable
							style={[
								styles.optionView,
								selection[id]?.index == i && {
									backgroundColor: "#666",
								},
							]}
							key={i}
							onPress={() => onOptionSelect(option, i)}>
							<Text style={styles.optionText}>{option}</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
};

export default React.memo(Question);

const styles = StyleSheet.create({
	questionContainer: {
		elevation: 5,
		padding: 10,
	},
	questionView: {
		marginBottom: 12,
	},
	questionText: {
		fontSize: 24,
	},
	optionsContainer: {
		flex: 1,
		marginBottom: 12,
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 12,
		justifyContent: "center",
	},
	optionView: {
		marginBottom: 12,
		flexBasis: "45%",
		backgroundColor: "#333",
		borderRadius: 5,
	},
	optionText: {
		padding: 10,
		textAlign: "center",
		fontSize: 18,
	},
});
