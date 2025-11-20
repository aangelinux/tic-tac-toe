/**
 * Represents the game board.
 */

import { template } from "./board-template.js"
import { Tile } from "../tile/tile.js"

export class Board extends HTMLElement {
	constructor() {
		super()
		
		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))

		this.tiles = []
	}

	connectedCallback() {
	}

	draw(size) {
		for (let i = 0; i < size; i++) {
			const tile = new Tile()
			this.tiles.push(tile)
		}
	}
}

customElements.define("game-board", Board)