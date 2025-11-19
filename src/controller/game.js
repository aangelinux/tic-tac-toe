/**
 * Game controller to manage turns between human and AI.
 */

export class Game extends EventTarget {

	constructor() {
		super()

		this.init()
	}

	init() {
		this.addEventListener("humanPlayedTurn", () => this.giveTurnToAI())
	}

	giveTurnToAI() {
	}
}