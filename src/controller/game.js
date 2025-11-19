/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {

	constructor(board, ai) {
		super()

		this.board = board
		this.ai = ai
	}

	start() {
		this.addEventListener("humanPlayedTurn", () => this.giveTurnToAI())
	}

	giveTurnToAI() {
		this.ai.play(this.board)
	}
}