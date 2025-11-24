/**
 * Timer that invokes a callback function.
 */

export class Timer {
	#id

	constructor() {
		this.#id = null
	}

	on(ms, ...callback) {
		this.#id = setTimeout(() => {
			callback.forEach(func => func())
			this.#id = null
		}, ms)
	}
}