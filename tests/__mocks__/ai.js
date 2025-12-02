export class AIMock {

	constructor(random) {
		this.random = random
	}

	play(board) {
		const index = this.randomize(board)

		return board.tiles[index]
	}

	randomize(board) {
		this.random.max = board.tiles.length - 1

		return this.random.value
	}
}