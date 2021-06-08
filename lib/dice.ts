import { getRandomInt, getRandomItem } from "./random";


export type DieData = {
    sides:number
}



class Die {
    sides:number



    constructor ( data : DieData ) {
        const { sides  } = data
        this.sides = sides
    }
}