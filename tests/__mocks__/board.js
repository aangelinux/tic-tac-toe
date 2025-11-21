import { TileMock } from "./tile"

export class BoardMock {

	constructor() {
		this.tiles = []
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = new TileMock()
			this.tiles.push(tile)
		}
	}
}