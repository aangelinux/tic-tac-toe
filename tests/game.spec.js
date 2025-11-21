/**
 * Unit tests for the game controller.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Game } from "../src/controller/game"
import { AIMock } from "./__mocks__/ai.js"
import { BoardMock } from "./__mocks__/board.js"
import { RandomStub } from "./__mocks__/random.js"

describe("Game", () => {
	it("should give turn to AI when human has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()))
		const giveTurnToAI = jest.spyOn(game, "giveTurnToAI")

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

	it("should tell Board to mark AI's chosen tile", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()))

		//Act
		game.start()
		game.giveTurnToAI()

		//Assert
		expect(boardMock.tiles[8].svg.querySelector("line")).toBeInstanceOf(SVGElement)
	})
})