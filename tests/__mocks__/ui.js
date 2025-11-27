export class UIMock extends HTMLElement{

	constructor() {
		super()

	}

	connectedCallback() {
	}
}

customElements.define("game-ui", UIMock)