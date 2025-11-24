/**
 * Timer that takes any callback function.
 */

export class Timer {
	constructor() {
	}

	on(seconds, callback) {
		setTimeout(() => {
			callback
		}, seconds)
	}
}