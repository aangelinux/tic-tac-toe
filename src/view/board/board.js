/**
 * Represents the game board.
 */

import { template } from "./board-template.js"

export class Board extends HTMLElement {
	constructor() {
		super()
		
		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))

		this.tiles = []
	}

	connectedCallback() {
	}

	#drawBackwardDiagonal(tile) {
		const cross = document.createElementNS("http://www.w3.org/2000/svg", "line")
		cross.setAttribute("x1", (tile.offsetWidth / 4))
		cross.setAttribute("y1", (tile.offsetWidth / 4))
		cross.setAttribute("x2", (tile.offsetWidth / 4) * 3)
		cross.setAttribute("y2", (tile.offsetWidth / 4) * 3)
		cross.classList.add("cross")

		return cross
	}

	#drawForwardDiagonal(tile) {
		const cross = document.createElementNS("http://www.w3.org/2000/svg", "line")
		cross.setAttribute("x1", (tile.offsetWidth / 4) * 3)
		cross.setAttribute("y1", (tile.offsetWidth / 4))
		cross.setAttribute("x2", (tile.offsetWidth / 4))
		cross.setAttribute("y2", (tile.offsetWidth / 4) * 3)
		cross.classList.add("cross")

		return cross
	}
}

customElements.define("game-board", Board)