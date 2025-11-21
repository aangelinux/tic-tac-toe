/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#turn // number. need boundary tests to make sure turn is between 0-9
	#player // user | AI
	#row // for keeping track of how many noughts/crosses currently in a row

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

		tile.markCross()
	}
}