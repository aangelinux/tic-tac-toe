/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#delayInMS = 1000 // between human and AI
	#turn // number. need boundary tests to make sure turn is between 0-9
	#player // current player: user | AI

	constructor(board, ai, timer) {
		super()

		this.board = board
		this.ai = ai
		this.timer = timer
	}

	start() {
		document.body.appendChild(this.board)

		document.addEventListener("human-played", () => {  // move to separate method
			this.hasThreeInARow()
			this.disableBoard()
			this.timer.on(this.#delayInMS, () => {
				this.aiMove()
				this.hasThreeInARow()
				this.enableBoard()
			})
		})
	}

	disableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.disable()
		})
	}

	aiMove() {
		const tile = this.ai.play(this.board)
		tile.markCross()
	}

	enableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.enable()
		})
	}

	hasThreeInARow() {
		const winner = this.board.hasThreeInARow()

		if (winner === "cross") {
			return "AI"
		} else if (winner === "circle") {
			return "Player"
		} else {
			return false
		}
	}
}