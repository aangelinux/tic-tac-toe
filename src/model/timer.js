/**
 * Timer that invokes a callback function.
 */

export class Timer {
	constructor() {
		this.id = null
	}

	on(ms, callback) {
		this.id = setTimeout(() => {
			callback()
		}, ms)
	}
}