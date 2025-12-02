/**
 * Unit tests for the UI.
 */

import '@testing-library/jest-dom'
import { describe, it, expect } from "@jest/globals"
import { UI } from "../src/view/ui/ui"

describe("UI", () => {
	it("should say 'Player: Human' when it's the player's turn", () => {
		//Arrange
		const ui = new UI()
		const state = { player: "Human" }

		//Act
		ui.update(state)

		//Assert
		expect(ui.text).toHaveTextContent("Player: Human")
	})

	it("should say 'Player: AI' when it's AI's turn", () => {
		//Arrange
		const ui = new UI()
		const state = { player: "AI" }

		//Act
		ui.update(state)

		//Assert
		expect(ui.text).toHaveTextContent("Player: AI")		
	})

	it("should display the current turn's number", () => {
		//Arrange
		const ui = new UI()
		const state = { turn: 8 }

		//Act
		ui.update(state)

		//Assert
		expect(ui.text).toHaveTextContent("Turn: 8")
	})
})