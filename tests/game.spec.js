/**
 * Unit tests for the game controller.
 */

import '@testing-library/jest-dom'
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { Game } from "../src/controller/game"
import { AIMock } from "./__mocks__/ai.js"
import { BoardMock } from "./__mocks__/board.js"
import { TimerMock } from "./__mocks__/timer.js"
import { RandomStub } from "./__mocks__/random.js"

describe("Game", () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})
	
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
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should re-enable board when AI has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).not.toHaveAttribute("disabled")
	})

	it("should check if there are three in a row after player turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const hasThreeInARow = jest.spyOn(game, "hasThreeInARow")

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)

		//Assert
		expect(hasThreeInARow).toHaveBeenCalledTimes(1)
	})

	it("should check if there are three in a row after AI turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const hasThreeInARow = jest.spyOn(game, "hasThreeInARow")

		//Act
		game.start()
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)
		jest.advanceTimersByTime(1000)

		//Assert
		expect(hasThreeInARow).toHaveBeenCalledTimes(2)
	})

	it("should return player as winner if there are three circles in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())
		const hasWinner = jest.spyOn(game, "hasWinner")

		//Act
		game.start()
		boardMock.tiles[0].markCircle()
		boardMock.tiles[1].markCircle()
		boardMock.tiles[2].markCircle()
		game.hasWinner([boardMock.tiles[0], boardMock.tiles[1], boardMock.tiles[2]])

		//Assert
		expect(hasWinner).toHaveReturnedWith("Player")
	})

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})