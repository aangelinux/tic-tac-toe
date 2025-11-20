/**
 * Represents a tile on the game board.
 */

import { template } from "./tile-template"

export class Tile extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))
	}

	connectedCallback() {
		this.addEventListener("click", () => {
			if (this.isMarked()) {
				return
			} else {
				this.mark()
			}
		})
	}

	isMarked() {
		return this.getAttribute("marked") === true
	}

	mark() {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		svg.setAttribute("height", 0)
		svg.setAttribute("width", 0)

		this.appendChild(svg)
	}
}

customElements.define("board-tile", Tile)