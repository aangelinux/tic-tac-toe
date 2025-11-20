export class BoardMock {

	constructor() {
		this.tiles = []

		for (let i = 0; i < 9; i++) {
			const tile = document.createElement("div")
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