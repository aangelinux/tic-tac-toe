import { Tile } from "../../src/view/tile/tile"

export class BoardMock {

	constructor() {
		this.tiles = []
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = new Tile()
			this.tiles.push(tile)
		}
	}

	markCross(tile) {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		tile.appendChild(svg)
	}

	isMarked() {
		return false
	}
}