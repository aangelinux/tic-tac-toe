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

		board.tiles[index].marked = true
	}
}