/**
 * Unit tests for the UI.
 */

import '@testing-library/jest-dom'
import { describe, it, expect, jest } from "@jest/globals"
import { UI } from "../src/view/ui/ui"

describe("UI", () => {
	it("should update its content when a new turn starts", () => {
		//Arrange
		const ui = new UI()
		document.body.appendChild(ui)
		const update = jest.spyOn(ui, "update")

		//Act
		const newTurn = new CustomEvent("new-turn", { detail: "" })
		ui.dispatchEvent(newTurn)

		//Assert
		expect(update).toHaveBeenCalledTimes(1)
	})

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