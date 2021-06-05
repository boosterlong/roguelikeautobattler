import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {getRandomInt} from "../../lib/random";

export default function Battle () {
	const [logs, setLogs] = useState<string[]>([])

	useEffect(() => {
		const newLogs : string[] = []
		for (let i = 1; i <= 10; i++) {
			setTimeout(() => {
				const dmg = getRandomInt(1, 6)
				const attacker = i%2===0 ? 'Player' : "Monster"
				const defender = attacker === 'Player' ? 'Monster' : 'Player'
				newLogs.push(`${attacker} did ${dmg} damage to ${defender}`)
				setLogs([...newLogs])
			}, i * 2000)
		}
	}, [])

	return <View style={styles.container}>
		<Text>This is a Battle!</Text>
		<View>
			<Text>Here are our logs</Text>
			{logs.map((msg, key) => {
				return <View key={key}>{msg}</View>
			})}
		</View>
	</View>
}


const styles = StyleSheet.create({
	container: {
		maxWidth: '500px',
		width: '100%',
		padding: '10px',
		border: '1px solid #333333',
		background: '#F0F0F0'
	},
});
