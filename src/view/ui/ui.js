/**
 * Displays current player, turn, and eventual win or loss.
 */

import { template } from "./ui-template.js"

export class UI extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
			.appendChild(template.content.cloneNode(true))
		
	}

	connectedCallback() {

	}
}

customElements.define("game-ui", UI)