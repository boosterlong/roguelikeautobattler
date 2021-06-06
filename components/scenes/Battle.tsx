import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Combatant, {CombatantData , teamIsDead} from "../../lib/combatant.class";
import {getRandomInt, getRandomItem} from "../../lib/random";
import HpBar from "../HpBar"


const enemyNames = ["Imp", "Orc", "Troll", "Gnome", "Vampire", "Crossfitter"]
const startingHp = 10
const startingPlayer : CombatantData = {name: 'Judge Judy', currentHp: 30, maxHp: 30, minDmg: 3, maxDmg: 10, team: 'player'}

export default function Battle () {
	const [gameNumber, setGameNumber] = useState<number>(1)
	const [logs, setLogs] = useState<string[]>([])
	const [combatantDatas, setCombatants] = useState<CombatantData[]>([])
	const [activeCombatant, setActiveCombatant] = useState<number>(0)

	
	const combatants = combatantDatas.map((data) => {
		return new Combatant(data)
	} )

	const youLose = teamIsDead(combatants, 'player')
	const youWin = teamIsDead(combatants, 'monsters')

	useEffect(() => {
		const combatants : CombatantData[] = []
		combatants.push(startingPlayer)
		for (let i = 1; i <= 5; i++) {
			combatants.push({
				name: getRandomItem(enemyNames),
				currentHp: 5,
				maxHp: 5,
				minDmg:1,
				maxDmg: 2,
				team: 'monsters',
			})
		}
		setCombatants(combatants)
		setLogs([])
	}, [gameNumber])

	function resetHp() {
		setGameNumber(gameNumber+1)
	}

	function newTurn() {
		const attacker = combatants[activeCombatant]
		const defender = attacker.getTarget(combatants)
		const dmg = attacker.rollDamage()
		logs.push(`${attacker.name} did ${dmg} damage to ${defender.name}`)
		defender.takeDamage(dmg)
		setCombatants(combatants.map((c) => {
			return c.getData()
		}))
		setLogs([...logs])
		let nextCombatant = activeCombatant
		do {
			nextCombatant = (nextCombatant + 1)
			if (nextCombatant == combatants.length) {
				nextCombatant = 0
			}} 
		while (combatants[nextCombatant].isDead())
		setActiveCombatant(nextCombatant)
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
		<Text>Game # {gameNumber}</Text>

		{combatants.map(cbt => {
			return <View>
				<Text>{cbt.name} HP</Text>
				<HpBar current={cbt.currentHp} max={cbt.maxHp}></HpBar>
			</View>
		})}
			
			<Pressable style={styles.button} onPress={() => newTurn()}>Advance Combat</Pressable>
			<Text>Battle Log:</Text>
			{logs.map((msg, key) => {
				return <View key={key}>{msg}</View>
			})}	
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
