/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#turn = 1 // could use some boundary tests
	#player = "Human"
	#delayInMS = 1000

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
		document.addEventListener("human-played", () => this.play())
	}

	play() {
		this.#disableBoard()

		if (!this.hasWinner()) {
			this.#player = "AI"
			this.#turn++
			this.#updateUI()
			
			this.timer.on(this.#delayInMS, () => {
				this.#moveAI()
				if (!this.hasWinner()) {
					this.#turn++
					this.#player = "Human"
					this.#updateUI()
					this.#enableBoard()
				}				
			})
		}
	}

	hasWinner() {
		const mark = this.board.hasThreeInARow()

		if (mark === "cross") {
			return "AI"
		} else if (mark === "circle") {
			return "Human"
		} else {
			return false
		}
	}

	#updateUI() {
		const event = new CustomEvent("new-turn", {
			detail: { player: this.#player, turn: this.#turn }
		})

		this.ui.dispatchEvent(event)
	}

	#disableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.disable()
		})
	}

	#moveAI() {
		const tile = this.ai.play(this.board)
		tile.markCross()
	}

	#enableBoard() {
		this.board.tiles.forEach((tile) => {
			tile.enable()
		})
	}
}