/**
 * Represents AI player.
 */

export class AI {

	constructor(random) {
		this.random = random
	}

	play(board) {
		this.random.value = 8
		const index = this.random.value

		let tile = board.tiles[index]
		while (board.isMarked(tile)) {
			tile = this.randomize(board)
		}

		return tile
	}

	randomize(board) {
		this.random.value = 8
		const index = this.random.value
		const tile = board.tiles[index]
		
		return tile
	}
}