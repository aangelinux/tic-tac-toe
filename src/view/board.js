/**
 * Represents the game board.
 */

import { template } from "./board-template.js"

export class Board extends HTMLElement {
	constructor() {
		super()
		
		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))

		this.tiles = this.shadowRoot.querySelectorAll(".tile")
	}

	connectedCallback() {
		this.tiles.forEach((tile => {
			tile.marked = false
			tile.addEventListener("click", () => {
				this.mark(tile)
				this.markRandom()
			})
		}))
	}

	mark(tile) {
		if (tile.marked) {
			return
		} else {
			const svg = this.#drawSVG(tile)
			tile.appendChild(svg)
			const nought = this.#drawNought(tile)
			svg.appendChild(nought)
			tile.marked = true		
		}
	}

	markRandom() {
	}

	#drawSVG(tile) {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		svg.setAttribute("height", tile.offsetHeight)
		svg.setAttribute("width", tile.offsetWidth)
		svg.classList.add("svg")

		return svg
	}

	#drawNought(tile) {
		const nought = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		nought.setAttribute("r", (tile.offsetHeight / 3)) // Remove magic number
		nought.setAttribute("cx", (tile.offsetWidth / 2))
		nought.setAttribute("cy", (tile.offsetHeight / 2))
		nought.classList.add("nought")

		return nought
	}
}

customElements.define("game-board", Board)