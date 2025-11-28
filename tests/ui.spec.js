/**
 * Unit tests for the UI.
 */

import '@testing-library/jest-dom'
import { describe, it, expect } from "@jest/globals"
import { UI } from "../src/view/ui/ui"

describe("UI", () => {
	it("should say 'Your Turn' when it's player's turn", () => {
		//Arrange
		const ui = new UI()
		const state = { turn: "Your" }

		//Act
		ui.update(state)

		//Assert
		expect(ui.div).toHaveTextContent("Your Turn")
	})

	it("should say 'AI's turn' when it's ai's turn", () => {
		//Arrange
		const ui = new UI()
		const state = { turn: "AI's" }

		//Act
		ui.update(state)

		//Assert
		expect(ui.div).toHaveTextContent("AI's Turn")		
	})

	it("should display current turn number", () => {
		//Arrange
		const ui = new UI()
		const state = { turn: "Your", number: 8 }

		//Act
		ui.update(state)

		//Assert
		expect(ui.div).toHaveTextContent("Turn: 8")
	})
})