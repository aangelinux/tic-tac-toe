/**
 * Generates a random number.
 */

export class Random {
	#value
	#max

	constructor() {
		this.#value = null
		this.#max = null
	}

	set max(value) {
		this.#max = value
	}

	get value() {
		this.#value = Math.floor(Math.random() * this.#max)

		return this.#value
	}
}