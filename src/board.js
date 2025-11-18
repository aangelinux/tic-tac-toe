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
		const nought = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		nought.setAttribute("r", 45)
		nought.setAttribute("fill", "none")
		nought.setAttribute("stroke", "black")
		nought.setAttribute("stroke-width", 3)

		clickedTile.appendChild(nought)
		clickedTile.marked = true
	}
}