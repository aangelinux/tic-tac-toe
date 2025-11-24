/**
 * Timer that invokes a callback function.
 */

export class Timer {
	#id

	constructor() {
		this.#id = null
	}

	on(ms, callback) {
		this.#id = setTimeout(() => {
			callback()
			this.#id = null
		}, ms)
	}
}