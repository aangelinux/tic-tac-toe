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
				this.markNought(tile)
				this.fireEvent()
		})}))
	}

	markNought(tile) {
		if (tile.marked) {
			return
		} else {
			const svg = this.#drawSVG(tile)
			tile.appendChild(svg)
			svg.appendChild(this.#drawNought(tile))
			tile.marked = true		
		}
	}

	markCross(tile) {
		if (tile.marked) {
			return
		} else {
			const svg = this.#drawSVG(tile)
			tile.appendChild(svg)
			svg.appendChild(this.#drawForwardDiagonal(tile))
			svg.appendChild(this.#drawBackwardDiagonal(tile))
			tile.marked = true
		}
	}

	fireEvent() {
		const event = new CustomEvent("human-played", {
			bubbles: true,
			composed: true
		})

		document.dispatchEvent(event)
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
		nought.setAttribute("r", (tile.offsetHeight / 4)) // Remove magic number
		nought.setAttribute("cx", (tile.offsetWidth / 2))
		nought.setAttribute("cy", (tile.offsetHeight / 2))
		nought.classList.add("nought")

		return nought
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