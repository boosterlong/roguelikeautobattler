import {Pressable, Text, View} from "react-native";
import React from "react";

export type StartGameProps = {
	onPress: Function
}

export default function StartGame({onPress} : StartGameProps) {
	return <View>
		<Text>You Need To Start</Text>
		<Pressable onPress={() => onPress()}>Start</Pressable>
	</View>
}
