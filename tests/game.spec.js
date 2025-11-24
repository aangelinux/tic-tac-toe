/**
 * Unit tests for the game controller.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Game } from "../src/controller/game"
import { AIMock } from "./__mocks__/ai.js"
import { BoardMock } from "./__mocks__/board.js"
import { TimerMock } from "./__mocks__/timer.js"
import { RandomStub } from "./__mocks__/random.js"

describe("Game", () => {
	it("should start a timer when player marks a tile", () => {
		//Arrange
		const timerMock = new TimerMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), timerMock)
		const timer = jest.spyOn(timerMock, "on")

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)

		//Assert
		expect(timer).toHaveBeenCalledTimes(1)
	})

	it("should let AI play when timer runs out", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const aiMove = jest.spyOn(game, "aiMove")

		jest.useFakeTimers()

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)
		jest.advanceTimersByTime(1000)

		//Assert
		expect(aiMove).toHaveBeenCalledTimes(1)
	})

	it("should tell Board to mark AI's chosen tile", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())

		//Act
		game.start()
		game.aiMove()

		//Assert
		expect(boardMock.tiles[8].svg.querySelector("line")).toBeInstanceOf(SVGElement)
	})

	it("should disable board from player until AI has played", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const disableBoard = jest.spyOn(game, "disableBoard")

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)

		//Assert
		expect(disableBoard).toHaveBeenCalledTimes(1)
	})

	it("should re-enable board when AI has played", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const enableBoard = jest.spyOn(game, "enableBoard")

		//Act
		game.start()
		game.aiMove()

		//Assert
		expect(enableBoard).toHaveBeenCalledTimes(1)		
	})
})