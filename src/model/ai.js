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
		while (tile.marked === true) {
			this.random.value = 8
			const index = this.random.value
			tile = this.tiles[index]
		}

		tile.marked = true
	}
}