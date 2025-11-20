/**
 * Represents a tile on the game board.
 */

import { template } from "./tile-template"

export class Tile extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))

		this.height = this.offsetHeight
		this.width = this.offsetWidth

		this.svg = this.shadowRoot.querySelector("svg")
	}

	connectedCallback() {
		this.addEventListener("click", () => {
			this.isMarked()
			this.mark()
		})
	}

	isMarked() {
		return this.getAttribute("marked") === true
	}

	mark() {
		const circle = this.drawCircle()
		this.svg.appendChild(circle)
	}

	drawCircle() {
		const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		circle.setAttribute("r", (this.height / 4)) // Remove magic number
		circle.setAttribute("cx", (this.width / 2))
		circle.setAttribute("cy", (this.height / 2))
		circle.classList.add("circle")

		return circle
	}
}

customElements.define("board-tile", Tile)