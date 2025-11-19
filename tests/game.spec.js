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
		const game = new Game(new Board(), new AI(new RandomStub()))
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

	it("should tell Board to mark AI's chosen tile", () => {
		//Arrange
		const board = new Board()
		const game = new Game(board, new AI(new RandomStub()))

		//Act
		game.start()
		game.giveTurnToAI()

		//Assert
		expect(board.tiles[8].querySelector("svg")).toBeInstanceOf(SVGAElement)
	})
})