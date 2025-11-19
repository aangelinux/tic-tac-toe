/**
 * Generates a random number.
 */

export class Random {
	#value

	constructor() {
		this.#value = null
	}

	set value(boardSize) {
		this.#value = Math.floor(Math.random() * boardSize)
	}

	get value() {
		return this.#value
	}
}