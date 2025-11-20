export class AIMock {

	constructor(random) {
		this.random = random
	}

	play(board) {
		const index = this.randomize()

		return board.tiles[index]
	}

	randomize() {
		this.random.value = 8

		return this.random.value
	}
}