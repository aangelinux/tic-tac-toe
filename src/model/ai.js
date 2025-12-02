/**
 * Represents AI player.
 */

export class AI {

	constructor(random) {
		this.random = random
	}

	play(board) {
		let index = this.randomize(board)
		let tile = board.tiles[index]

		while (tile.isMarked()) {
			index = this.randomize(board)
			tile = board.tiles[index]
		}

		return tile
	}

	randomize(board) {
		this.random.max = board.tiles.length - 1
		const index = this.random.value
		
		return index
	}
}