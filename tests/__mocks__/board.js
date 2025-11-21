import { TileMock } from "./tile"

export class BoardMock extends HTMLElement {

	constructor() {
		super()

		this.tiles = []
	}

	connectedCallback() {
		this.draw(9)
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = new TileMock()
			this.tiles.push(tile)
		}
	}
}

customElements.define("game-board", BoardMock)