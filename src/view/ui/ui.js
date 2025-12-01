/**
 * Displays current state; player, turn, and eventual win/loss.
 */

import { template } from "./ui-template.js"

export class UI extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))
		
		this.text = this.shadowRoot.querySelector("p")
	}

	connectedCallback() {
		this.addEventListener("new-turn", (e) => this.update(e.detail))
	}

	update(state) {
		const turn = state.turn
		const player = state.player
		this.text.textContent = `Turn: ${turn}, Player: ${player}`
	}
}

customElements.define("game-ui", UI)