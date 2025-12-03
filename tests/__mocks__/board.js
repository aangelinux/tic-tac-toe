import { TileMock } from "./tile"

export class BoardMock extends HTMLElement {

	constructor() {
		super()

		this.tiles = []
		this.size = 9
	}

	connectedCallback() {
		this.draw(this.size)
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = new TileMock()
			tile.setAttribute("id", i + 1)
			this.tiles.push(tile)
		}
	}

	hasThreeInARow() {
		return false
	}
}

customElements.define("game-board", BoardMock)