import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Combatant, {CombatantData} from "../../lib/combatant.class";
import {getRandomInt} from "../../lib/random";
import HpBar from "../HpBar"

const startingHp = 10
const startingMonster = {name: 'Dame Judy Dench', currentHp: 10, maxHp: 10, minDmg: 1, maxDmg: 10}
const startingPlayer = {name: 'Judge Judy', currentHp: 20, maxHp: 20, minDmg: 1, maxDmg: 4}

export default function Battle () {
	const [logs, setLogs] = useState<string[]>([])
	const [playerData, setPlayerData] = useState<CombatantData>(startingPlayer)
	const [monsterData, setMonsterData] = useState<CombatantData>(startingMonster)
	const [activeCombatant, setActiveCombatant] = useState<number>(0)

	const player = new Combatant(playerData)
	const monster = new Combatant(monsterData)
	const youLose = player.isDead()
	const youWin = monster.isDead()


	function resetHp() {
		setMonsterData(startingMonster)
		setPlayerData(startingPlayer)
		setLogs([])
	}

	function newTurn() {
		const attacker = activeCombatant == 1 ? player : monster;
		const defender= activeCombatant == 1 ? monster : player;
		const dmg = attacker.rollDamage()
		logs.push(`${attacker.name} did ${dmg} damage to ${defender.name}`)
		defender.takeDamage(dmg)
		setPlayerData(player.getData())
		setMonsterData(monster.getData())
		setLogs([...logs])
		setActiveCombatant(1 - activeCombatant)
	}
	const restart = <Pressable onPress={() => resetHp()}>Start Again!</Pressable>
	if (youLose) {
		return <><Text>You lose!</Text>
		{restart}</>
	}
	if (youWin) {
		return <><Text>You win! Good for you!</Text>
		{restart}</>
	}

	return <View style={styles.container}>
		<Text>{player.name} HP</Text>
		<HpBar current={player.currentHp} max={player.maxHp}></HpBar>
		<Text>{monster.name} HP
		</Text>
		<HpBar current={monster.currentHp} max={monster.maxHp}></HpBar>
		<View>			
			
			<Pressable style={styles.button} onPress={() => newTurn()}>Advance Combat</Pressable>
			<Text>Battle Log:</Text>
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
		backgroundColor: '#00CC00',
		padding: '5px',
		margin: 'auto',
		borderRadius: '40px'
	}
});
