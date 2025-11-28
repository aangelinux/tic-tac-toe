/**
 * Unit tests for the UI.
 */

import '@testing-library/jest-dom'
import { describe, it, expect, afterEach } from "@jest/globals"
import { UI } from "../src/view/ui/ui"

describe("UI", () => {
	it("should say 'Your Turn' when it's player's turn", () => {
		//Arrange
		const ui = UI()
		const turn = { turn: player }

		//Act
		ui.update(turn)

		//Assert
		expect(ui).toHaveTextContent("Your Turn")
	})
})