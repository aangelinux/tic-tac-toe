export class TileMock {

	constructor() {
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
	}
}