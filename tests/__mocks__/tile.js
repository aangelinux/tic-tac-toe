export class TileMock {

	constructor() {
		this.svg = new SVGElement()
	}

	markCross() {
		const line = document.createElementNS("http://www.w3.org/2000/line", "line")
		this.svg.appendChild(line)
	}

	isMarked() {
		return false
	}
}