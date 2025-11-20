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
		this.addEventListener("click", () => this.isMarked())
	}

	isMarked() {
		return this.getAttribute("marked") === true
	}
}

customElements.define("board-tile", Tile)