/**
 * Represents a tile on the game board.
 */

export class Tile extends HTMLElement {

	constructor() {
		super()

		this.addEventListener("click", () => this.isMarked())
	}

	isMarked() {

	}
}

customElements.define("board-tile", Tile)