/**
 * Represents a tile on the game board.
 */

import { template } from "./tile-template"

export class Tile extends HTMLElement {
	static observedAttributes = ["marked"]

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
			if (!this.isMarked()) {
				this.mark()
			}
		})
	}

	isMarked() {
		return this.getAttribute("marked") === "true"
	}

	mark() {
		const circle = this.drawCircle()
		this.svg.appendChild(circle)

		this.setAttribute("marked", true)
	}

	drawCircle() {
		const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		circle.setAttribute("r", (this.height / 4)) // Remove magic number
		circle.setAttribute("cx", (this.width / 2))
		circle.setAttribute("cy", (this.height / 2))
		circle.classList.add("circle")

		return circle
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "marked" && newValue != oldValue && newValue === "true"){
			const event = new CustomEvent("human-played", {
				bubbles: true,
				composed: true
			})

			document.dispatchEvent(event)
		}
	}
}

customElements.define("board-tile", Tile)