export class TileMock extends HTMLElement {

	constructor() {
		super()

		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	}

	markCross() {
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
		this.svg.appendChild(line)
	}

	isMarked() {
		return false
	}

	disable() {
		this.setAttribute("disabled", "")
	}

	enable() {
		this.removeAttribute("disabled")
	}
}

customElements.define("board-tile", TileMock)