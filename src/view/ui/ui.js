/**
 * Displays current player, turn, and eventual win or loss.
 */

import { template } from "./ui-template.js"

export class UI extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))
		
		this.ui = this.shadowRoot.querySelector("#ui")
	}

	connectedCallback() {

	}

	update(turn) {
		const text = document.createElement("p")
		text.textContent = "Your Turn"

		this.ui.appendChild(text)
	}
}

customElements.define("game-ui", UI)