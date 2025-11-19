/**
 * Unit tests for the game controller.
 */

import { describe, it, expect, jest } from "@jest/globals"

describe("Game", () => {
	it("should give turn to AI when human has played", () => {
		//Arrange
		const game = new Game()
		const giveTurnToAI = jest.spyOn(game, "giveTurnToAI") // coupling to implementation; fix later

		//Act
		const humanPlayedTurn = new CustomEvent("humanPlayedTurn")
		game.dispatchEvent(humanPlayedTurn)

		//Assert
		expect(giveTurnToAI).toHaveBeenCalledTimes(1)
	})
})