import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View, Image, ImageBackground} from "react-native";
import Combatant, {CombatantData , teamIsDead} from "../../lib/combatant.class";
import {getRandomInt, getRandomItem} from "../../lib/random";
import HpBar from "../HpBar"
import heroSprite from '../../assets/herochar_idle_anim.gif'
import goblinSprite from '../../assets/goblin.gif'
import slimeSprite from '../../assets/slime.gif'
import background from "../../assets/background.png"


const enemyNames = ["Goblin","Slime"]
const startingHp = 10
const startingPlayer : CombatantData = {name: 'Hero', currentHp: 25, maxHp: 25, minDmg: 2, maxDmg: 5, team: 'player', sprite: heroSprite}


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
		for (let i = 1; i <= getRandomInt(2,3); i++) {
			const name = getRandomItem(enemyNames)
			if (name == 'Goblin') {
				combatants.push({
					name: name,
					currentHp: Math.floor(2.5 * gameNumber),
					maxHp: Math.floor(2.5 * gameNumber),
					minDmg:0,
					maxDmg: Math.floor((1.5 * gameNumber) + 1),
					team: 'monsters',
					sprite: goblinSprite,
				})
			}
			else if (name == 'Slime') {
				combatants.push({
					name: name,
					currentHp: Math.floor(4.5 * gameNumber),
					maxHp: Math.floor(4.5 * gameNumber),
					minDmg:0,
					maxDmg: Math.floor((0.5 * gameNumber) + 1),
					team: 'monsters',
					sprite: slimeSprite,
				})
			}
		}
		setCombatants(combatants)
		setLogs([])
	}, [gameNumber])

	function resetHp() {
		setGameNumber(gameNumber+1)
	}

	function newGame() {
		resetHp()
		setGameNumber(1)
	}

	function newTurn() {
		const attacker = combatants[activeCombatant]
		const defender = attacker.getTarget(combatants)
		const dmg = attacker.rollDamage()
		if (dmg == 0) {
			logs.push(`${attacker.name} missed!`)}
		else {logs.push(`${attacker.name} did ${dmg} damage to ${defender.name}!`)}
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

	const gameOver = <Pressable onPress={() => newGame()}><button>Start Again!</button></Pressable>

	const restart = <Pressable onPress={() => resetHp()}><button>Next Round!</button></Pressable>
	if (youLose) {
		return <><Text>You lose after winning {gameNumber - 1} rounds!</Text>
		{gameOver}</>
	}
	if (youWin) {
		return <><Text>You win! Good for you!</Text>
		{restart}</>
	}
	if (gameNumber == 6) {
		return <><Text>You have defeated all the Goblins and Slimes and saved the world!</Text>
		{gameOver}</>
	}
	else {
		return <View style={styles.container}>
			<ImageBackground source={background} style={styles.backdrop}>
			<Text>Game # {gameNumber}</Text>

			{combatants.map(cbt => {
				let style
				let textPos = 'top'
				const text = <Text>{cbt.name}</Text>
				if (cbt.name == 'Hero') {
					style = styles.leftColumn
				} else {
					textPos = 'bottom'
					style = styles.rightColumn
				}
				return <View style={style}>
					{textPos == 'top' && text}
					<View style={styles.sprite}><img src={cbt.sprite}></img></View>
					<HpBar current={cbt.currentHp} max={cbt.maxHp}></HpBar>
					{textPos == 'bottom' && text}
				</View>
			})}
				</ImageBackground>
				<Pressable onPress={() => newTurn()}><button>Advance Combat</button></Pressable>
				<Text>Battle Log:</Text>
				{logs.reverse().map((msg, key) => {
					return <View key={key}>{msg}</View>
				})}
			</View>
}}


const styles = StyleSheet.create({
	container: {
		maxWidth: '500px',
		width: '100%',
		padding: '10px',
		border: '1px solid #333333',
		background: '#F0F0F0',
			},
	button: {
		backgroundColor: '#00CC00',
		padding: '5px',
		margin: 'auto',
		borderRadius: 40
	},
	sprite: {
		width: '60px',
	},
	leftColumn: {
		flex: 1,
		alignSelf: 'flex-start',
		width: '200px',
	},
	rightColumn: {
		alignSelf: 'flex-end',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	backdrop: {
		resizeMode: 'contain',
	}
});
