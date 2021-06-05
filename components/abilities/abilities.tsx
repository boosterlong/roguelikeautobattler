import {Text} from "react-native";
import React from "react";

function CAbility({ability} : {ability: Ability}) {
	let name = ability.name
	ability.modifiers.forEach((modifier:Modifier) => {
		if (modifier.position == 'prefix') {
			name = modifier.text + ' ' + name
		} else {
			name = name + ' ' + modifier.text
		}
	})
	return <Text>{name} [{ability.modifiers.length}]</Text>
}
