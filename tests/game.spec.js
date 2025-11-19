/**
 * Unit tests for the game controller.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Game } from "../src/controller/game"

describe("Game", () => {
	it("should give turn to AI when human has played", () => {
		//Arrange
		const game = new Game()
		const giveTurnToAI = jest.spyOn(game, "giveTurnToAI") // TODO fix coupling to implm

		//Act
		const humanPlayedTurn = new CustomEvent("humanPlayedTurn")
		game.start()
		game.dispatchEvent(humanPlayedTurn)

		//Assert
		expect(giveTurnToAI).toHaveBeenCalledTimes(1)
	})
})