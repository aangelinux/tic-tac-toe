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
}