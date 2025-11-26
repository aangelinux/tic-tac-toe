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
			if (this.hasThreeInARow()) {
				this.disableBoard()
			} else {
				this.disableBoard()
				this.timer.on(this.#delayInMS, () => {
					this.aiMove()
					if (!this.hasThreeInARow()) {
						this.enableBoard()
					}				
				})
			}
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
		const mark = this.board.hasThreeInARow()

		if (mark === "cross") {
			return "AI"
		} else if (mark === "circle") {
			return "Player"
		} else {
			return false
		}
	}
}