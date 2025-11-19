/**
 * Unit tests for the game controller.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Game } from "../src/controller/game"
import { Board } from "../src/view/board"
import { AI } from "../src/model/ai"
import { RandomStub } from "./__mocks__/random.js"

describe("Game", () => {
	it("should give turn to AI when human has played", () => {
		//Arrange
		const random = new RandomStub()
		const game = new Game(new Board(), new AI(random))
		const giveTurnToAI = jest.spyOn(game, "giveTurnToAI") // TODO fix coupling to implm

		//Act
		game.start()
		const humanPlayedTurn = new CustomEvent("human-played", {
			bubbles: true,
			composed: true
		})
		document.documentElement.dispatchEvent(humanPlayedTurn)

		//Assert
		expect(giveTurnToAI).toHaveBeenCalledTimes(1)
	})
})