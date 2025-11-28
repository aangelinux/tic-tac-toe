/**
 * Displays current state; player, turn, and eventual win/loss.
 */

import { template } from "./ui-template.js"

export class UI extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))
		
		this.div = this.shadowRoot.querySelector("#ui")
	}

	connectedCallback() {
		this.addEventListener("new-turn", (e) => this.update(e.detail))
	}

	update(state) {
		const text = document.createElement("p")
		const player = state.turn
		const number = state.number
		text.textContent = `Turn: ${number}. ${player} Turn`

		this.div.appendChild(text)
	}
}

customElements.define("game-ui", UI)