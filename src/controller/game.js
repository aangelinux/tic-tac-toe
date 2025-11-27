/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#delayInMS = 1000 // between human and AI
	#turn // number. need boundary tests to make sure turn is between 0-9
	#player // current player: user | AI

	constructor(board, ai, timer, ui) {
		super()

		this.board = board
		this.ai = ai
		this.timer = timer
		this.ui = ui
	}

	start() {
		document.body.appendChild(this.ui)
		document.body.appendChild(this.board)
		
		document.addEventListener("human-played", () => this.playTurn())
	}

	playTurn() {
		this.#disableBoard()

		if (!this.hasThreeInARow()) {
			this.timer.on(this.#delayInMS, () => {
				this.#aiMove()
				if (!this.hasThreeInARow()) {
					this.#enableBoard()
				}				
			})
		}
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

	#disableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.disable()
		})
	}

	#aiMove() {
		const tile = this.ai.play(this.board)
		tile.markCross()
	}

	#enableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.enable()
		})
	}
}