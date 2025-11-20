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
			if (!this.isMarked()) {
				this.markCircle()
				this.emitEvent()
			}
		})
	}

	isMarked() {
		return this.getAttribute("marked") === "true"
	}

	markCircle() {
		const circle = this.drawCircle()
		this.svg.appendChild(circle)

		this.setAttribute("marked", true)
	}

	markCross() {
		const forwardDiagonal = this.drawForwardDiagonal()
		this.svg.appendChild(forwardDiagonal)
		const backwardDiagonal = this.drawBackwardDiagonal()
		this.svg.appendChild(backwardDiagonal)

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

	drawForwardDiagonal() {
		const cross = document.createElementNS("http://www.w3.org/2000/svg", "line")
		cross.setAttribute("x1", (this.width / 4) * 3)
		cross.setAttribute("y1", (this.width / 4))
		cross.setAttribute("x2", (this.width / 4))
		cross.setAttribute("y2", (this.width / 4) * 3)
		cross.classList.add("cross")

		return cross
	}

	drawBackwardDiagonal() {
		const cross = document.createElementNS("http://www.w3.org/2000/svg", "line")
		cross.setAttribute("x1", (this.width / 4))
		cross.setAttribute("y1", (this.width / 4))
		cross.setAttribute("x2", (this.width / 4) * 3)
		cross.setAttribute("y2", (this.width / 4) * 3)
		cross.classList.add("cross")

		return cross
	}

	emitEvent() {
		const event = new CustomEvent("human-played", {
			bubbles: true,
			composed: true
		})

		document.dispatchEvent(event)
	}
}

customElements.define("board-tile", Tile)