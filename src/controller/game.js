/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#delayInMS = 1000 // between human and AI
	#turn // number. need boundary tests to make sure turn is between 0-9
	#player // current player: user | AI
	#rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["1", "4", "7"],
		["2", "5", "8"],
		["3", "6", "9"],
		["1", "5", "9"],
		["3", "5", "7"]
	]

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
		for (const row of this.#rows) {
			const currentRow = row.map(id =>
				this.board.tiles.find((tile) => tile.getAttribute("id") === id)
			)
			
			const winner = this.hasWinner(currentRow)
			if (winner) {
				return winner
			} else {
				continue
			}
		}

		return false
	}

	hasWinner(row) {
		let AIMatches = 0
		let playerMatches = 0

		for (const tile of row) {
			if (tile.hasAttribute("circle")) {
				playerMatches++
			} else if (tile.hasAttribute("cross")) {
				AIMatches++
			}

			if (playerMatches === 3) {
				return "Player"
			}
			if (AIMatches === 3) {
				return "AI"
			}
		}

		return null
	}
}