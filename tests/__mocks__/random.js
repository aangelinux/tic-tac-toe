export class RandomStub {
	#max

	constructor() {
		this.#max = null
	}

	set max(value) {
		this.#max = value
	}

	get value() {
		return this.#max
	}
}