/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#turn = 1
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

		if (this.#startNewTurn()) {
			this.#updateState("AI")
			this.timer.on(this.#delayInMS, () => {
				this.#moveAI()
				if (this.#startNewTurn()) {
					this.#updateState("Human")
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

	#startNewTurn() {
		const allTilesMarked = this.board.tiles.every(tile =>
			tile.svg?.querySelector("line") || tile.svg?.querySelector("circle")
		)

		return (!this.hasWinner() && (this.#turn < this.board.size) && !allTilesMarked)
	}

	#updateState(player) {
		this.#player = player
		this.#turn++
		this.#updateUI()		
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