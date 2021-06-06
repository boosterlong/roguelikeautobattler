import { getRandomInt, getRandomItem } from './random';

type Team = 'monsters' | 'player'

export type CombatantData = {
    name:string
    currentHp:number
    maxHp:number
    minDmg:number
    maxDmg:number
    team:Team
}

class Combatant {
    name:string
    currentHp:number
    maxHp:number
    minDmg:number
    maxDmg:number
    team:Team

    constructor (data : CombatantData) {
        const {name, maxHp, currentHp, minDmg, maxDmg, team} = data
        this.name = name
        this.currentHp = currentHp
        this.maxHp = maxHp
        this.minDmg = minDmg
        this.maxDmg = maxDmg
        this.team = team
    }

    takeDamage(damage:number) {
        this.currentHp = (this.currentHp - damage)

        if (this.currentHp < 0) {
            this.currentHp = 0
        }
    }


    isDead():boolean {
        return this.currentHp === 0
    }

    getTarget(combatants:Combatant[]) : Combatant {
        const otherGuys = combatants.filter((c) => {
            return c.team != this.team && c.isDead() == false
        })
        return getRandomItem(otherGuys)
    }

    getData() : CombatantData {
        return {
            name:this.name,
            currentHp:this.currentHp,
            maxHp:this.maxHp,
            minDmg:this.minDmg,
            maxDmg:this.maxDmg,
            team:this.team,
        }
    }

    rollDamage() {
        return getRandomInt(this.minDmg, this.maxDmg)
    }
}

export function teamIsDead(combatants:Combatant[],team:Team ):boolean {
    const alivePeople = combatants.filter((combatant) => {
        return !combatant.isDead() && combatant.team == team
    })
    return alivePeople.length == 0
}


export default Combatant