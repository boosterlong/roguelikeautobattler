import {Duration} from "./steps";

async function delay (dur : Duration) {
	return new Promise((res) => {
		let amount
		if (dur === 'slow') {
			amount = 3000
		} else if (dur === 'fast') {
			amount = 1000
		} else if (dur === 'instant') {
			amount = 500
		}

		console.log('waiting', amount)
		setTimeout(() => {
			res()
		}, amount)
	})
}
