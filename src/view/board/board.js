/**
 * Represents the game board.
 */

import { template } from "./board-template.js"
import "../tile/tile.js"

export class Board extends HTMLElement {
	constructor() {
		super()
		
		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))

		this.size = 9 // Default
		this.tiles = []
		this.board = this.shadowRoot.querySelector(".board")
	}

	connectedCallback() {
		this.draw(this.size)
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = document.createElement("board-tile")
			tile.setAttribute("id", i + 1)
			this.tiles.push(tile)
			this.board.appendChild(tile)
		}
	}
}

customElements.define("game-board", Board)