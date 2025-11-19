export class RandomStub {
	#value

	constructor() {
		this.#value = null
	}

	set value(boardSize) {
		this.#value = boardSize
	}

	get value() {
		return this.#value
	}
}