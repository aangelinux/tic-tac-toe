/**
 * Represents the game board.
 */

import { template } from "./board-template.js"
import "../tile/tile.js"

export class Board extends HTMLElement {
	#possibleMatches = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["1", "4", "7"],
		["2", "5", "8"],
		["3", "6", "9"],
		["1", "5", "9"],
		["3", "5", "7"]
	]

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

	hasThreeInARow() {
		for (const row of this.#possibleMatches) {
			const tiles = this.#findTiles(row)
			const matches = this.#getMatches(tiles)

			if (matches) {
				return matches
			}
		}

		return false
	}

	#getMatches(tiles) {
		let crosses = 0
		let circles = 0

		for (const tile of tiles) {
			if (tile.hasAttribute("circle")) {
				circles++
			} else if (tile.hasAttribute("cross")) {
				crosses++
			}

			if (circles === 3) {
				return "circle"
			}
			if (crosses === 3) {
				return "cross"
			}
		}

		return null
	}

	#findTiles(row) {
		return row.map(id =>
			this.tiles.find((tile) => tile.getAttribute("id") === id))
	}
}

customElements.define("game-board", Board)