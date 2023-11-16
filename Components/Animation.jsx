import { Animated, Button, StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";

const Animation = () => {
	const { width } = useWindowDimensions();

	const [toggle, setToggle] = useState(false);
	const [fadeToggle, setFadeToggle] = useState(false);

	const rotateAnim = useRef(new Animated.Value(0)).current;
	const moveAnim = useRef(new Animated.Value(0)).current;
	const fadeAnim = useRef(new Animated.Value(1)).current;

	var deg = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	var pix = moveAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, width - 100],
	});

	function rotate() {
		Animated.timing(rotateAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			rotateAnim.setValue(0);
		});
	}

	function move() {
		Animated.timing(moveAnim, {
			toValue: !toggle ? 0 : 1,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			rotateAnim.setValue(!toggle ? 0 : 1);
			setToggle(!toggle);
		});
	}

	function fade() {
		Animated.timing(fadeAnim, {
			toValue: fadeToggle ? 1 : 0,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			fadeAnim.setValue(fadeToggle ? 1 : 0);
			setFadeToggle(!fadeToggle);
		});
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.boxContainer}>
				<Animated.View
					style={{ ...styles.box, transform: [{ rotateZ: deg }, { translateX: pix }], opacity: fadeAnim }}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button title="spin" onPress={rotate} />
				<Button title="move" onPress={move} />
				<Button title="fade" onPress={fade} />
			</View>
		</View>
	);
};

export default Animation;

const styles = StyleSheet.create({
	boxContainer: {
		flex: 1,
		justifyContent: "center",
	},
	box: {
		backgroundColor: "lightblue",
		width: 100,
		height: 100,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 20,
		gap: 20,
	},
});
