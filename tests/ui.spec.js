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
		const turn = { player: "Your" }

		//Act
		ui.update(turn)

		//Assert
		expect(ui.div).toHaveTextContent("Your Turn")
	})
})