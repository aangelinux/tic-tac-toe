/**
 * Represents AI player.
 */

export class AI {

	constructor(random) {
		this.random = random
	}

	play(board) {
		this.random.value = 8
		let index = this.random.value
		let tile = board.tiles[index]
		
		while (board.isMarked(tile)) {
			index = this.randomize()
			tile = board.tiles[index]
		}

		return tile
	}

	randomize() {
		this.random.value = 8
		const index = this.random.value
		
		return index
	}
}