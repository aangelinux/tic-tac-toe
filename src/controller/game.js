/**
 * Manage turns between human and AI.
 */

export class Game extends EventTarget {
	#delay = 1000 // delay between AI and human turn; in ms
	#turn // number. need boundary tests to make sure turn is between 0-9
	#player // current player: user | AI
	#row // keep track of how many noughts/crosses currently in a row

	constructor(board, ai, timer) {
		super()

		this.board = board
		this.ai = ai
		this.timer = timer
	}

	start() {
		document.body.appendChild(this.board)

		document.addEventListener("human-played", () => {
			this.disableBoard()
			this.timer.on(this.#delay, this.aiMove.bind(this))
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

		this.enableBoard()
	}

	enableBoard() {

	}
}