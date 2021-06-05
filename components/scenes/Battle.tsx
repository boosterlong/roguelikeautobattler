import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {getRandomInt} from "../../lib/random";
import HpBar from "../HpBar"

const startingHp = 10

export default function Battle () {
	const [logs, setLogs] = useState<string[]>([])
	const [playerHp, setPlayerHp] = useState<number>(startingHp)
	const youLose = playerHp <= 0

	function resetHp() {
		setPlayerHp(startingHp)
		setLogs([])
	}

	function newTurn() {
		const i = getRandomInt(0, 1)
		const dmg = getRandomInt(1, 6)
		const attacker = i%2===0 ? 'Player' : "Monster"
		const defender = attacker === 'Player' ? 'Monster' : 'Player'
		logs.push(`${attacker} did ${dmg} damage to ${defender}`)
		if (defender == 'Player') {
			let newHp = (playerHp - dmg)
			if (newHp < 0) {
				newHp = 0;
			}
			setPlayerHp(newHp)
		}
		setLogs([...logs])
	}

	if (youLose) {
		return <><Text>You lose!</Text>
		<Pressable onPress={() => resetHp()}>Start Again!</Pressable></>
	}

	return <View style={styles.container}>
		<Text>This is a Battle!</Text>
		<HpBar current={playerHp} max={10}></HpBar>
		<View>			
			<Text>Here are our logs</Text>
			<Pressable style={styles.button} onPress={() => newTurn()}>Button</Pressable>
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
	button: {
		backgroundColor: '#00CC00'
	}
});
