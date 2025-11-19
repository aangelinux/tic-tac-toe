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
		document.addEventListener("human-played", () => this.giveTurnToAI())
	}

	giveTurnToAI() {
		const tile = this.ai.play(this.board)
		this.board.markRandom(tile)
	}
}