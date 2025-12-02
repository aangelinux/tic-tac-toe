/**
 * Generates a random number.
 */

export class Random {
	#max

	constructor() {
		this.#max = null
	}

	set max(value) {
		this.#max = value
	}

	get value() {
		return Math.floor(Math.random() * this.#max)
	}
}