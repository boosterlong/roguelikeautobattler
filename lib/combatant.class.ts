import { getRandomInt } from './random';

export type CombatantData = {
    name:string
    currentHp:number
    maxHp:number
    minDmg:number
    maxDmg:number
}

class Combatant {
    name:string
    currentHp:number
    maxHp:number
    minDmg:number
    maxDmg:number    

    constructor (data : CombatantData) {
        const {name, maxHp, currentHp, minDmg, maxDmg} = data
        this.name = name
        this.currentHp = currentHp
        this.maxHp = maxHp
        this.minDmg = minDmg
        this.maxDmg = maxDmg
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

    getData() {
        return {
            name:this.name,
            currentHp:this.currentHp,
            maxHp:this.maxHp,
            minDmg:this.minDmg,
            maxDmg:this.maxDmg
        }
    }

    rollDamage() {
        return getRandomInt(this.minDmg, this.maxDmg)
    }
}


export default Combatant