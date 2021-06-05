import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";

export type StartGameProps = {
	onPress: Function
}

export default function StartGame({onPress} : StartGameProps) {
	return <View style={styles.view}>
		<Text style={styles.title}>You Need To Start</Text>
		<Pressable style={styles.button} onPress={() => onPress()}><Text>Start</Text></Pressable>
	</View>
}

const styles = StyleSheet.create({
	view: {
		width: '100%',
		paddingStart: 50,
		paddingEnd: 50
	},
	title: {
		fontSize: 18
	},
	button: {
		border: '1px solid #333',
		borderRadius: 3,
		padding: 5,
		textAlign: 'center',
	}
})
