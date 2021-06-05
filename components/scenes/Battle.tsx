import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";

export default function Battle () {
	const [logs, setLogs] = useState<string[]>([])

	useEffect(() => {
		const newLogs = []
		for (let i = 0; i <= 1000; i++) {
			setTimeout(() => {
				newLogs.push(`Person ${i%2===0} did ${Math.random()}!`)
			}, i * 2000)
		}
	}, [])

	return <View>
		<Text>This is a Battle!</Text>
	</View>
}
