/**
 * Game controller to manage turns between human and AI.
 */

export class Game extends EventTarget {

	constructor(board) {
		super()

		this.board = board
	}

	start() {
		this.addEventListener("humanPlayedTurn", () => this.giveTurnToAI())
	}

	giveTurnToAI() {
		const aiTile = this.board.randomize()
		this.board.markRandom(aiTile)
	}
}