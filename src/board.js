/**
 * Represents the game board.
 */

export class Board {
	constructor() {
		this.tiles = document.querySelectorAll(".tile")

		this.tiles.forEach((tile => {
			tile.marked = false
		}))
	}

	drawMark(clickedTile) {
		clickedTile.marked = true
	}
}