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

		document.addEventListener("human-played", () => {
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
		const matchingRows = [
			["1", "2", "3"],
			["4", "5", "6"],
			["7", "8", "9"],
			["1", "4", "7"],
			["2", "5", "8"],
			["3", "6", "9"],
			["1", "5", "9"],
			["3", "5", "7"]
		]

		matchingRows.forEach((row) => {
			let currentRow = []
			row.forEach((id) => {
				currentRow.push(this.board.tiles.find((tile) => tile.getAttribute("id") === id))
			})
			let playerMatches = 0
			let AIMatches = 0
			currentRow.forEach((tile) => {
				if (tile.hasAttribute("circle")) {
					playerMatches++
				} else if (tile.hasAttribute("cross")) {
					AIMatches++
				} else {
					return
				}
				if (playerMatches === 3) {
					console.log("Player wins!")
				} else if (AIMatches === 3) {
					console.log("AI wins!")
				} else {
					return
				}
				AIMatches = 0
				playerMatches = 0
			})
		})
	}
}