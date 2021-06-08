import { getRandomInt, getRandomItem } from "./random";


export type DiceData = {
    sides:number
}



class Dice {
    sides:number



    constructor ( data : DiceData ) {
        const { sides  } = data
        this.sides = sides
    }

    rollDie() {
        return getRandomInt(1, this.sides)
    }
}