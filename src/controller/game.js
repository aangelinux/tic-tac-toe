/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#turn = 0 // need boundary tests to make sure turn is between 0-9
	#player = { Human: "Human", AI: "AI" }
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
		
		document.addEventListener("human-played", () => this.playTurn())
	}

	playTurn() {
		this.#disableBoard()

		if (!this.hasWinner()) {
			this.#turn++
			this.#updateUI()
			this.timer.on(this.#delayInMS, () => {
				this.#moveAI()
				if (!this.hasWinner()) {
					this.#turn++
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
			return "Player"
		} else {
			return false
		}
	}

	#updateUI() {
		const event = new CustomEvent("new-turn", {
			detail: { player: "player", turn: this.#turn }
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