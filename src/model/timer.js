/**
 * Represents a timer.
 */

export class Timer {
	constructor() {
	}

	on(seconds, callback) {
		setTimeout(() => {
			callback()
		}, seconds)
	}
}