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
		game.playTurn()

		//Assert
		expect(timer).toHaveBeenCalledTimes(1)
	})

	it("should let AI play when timer runs out", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const aiMove = jest.spyOn(game, "aiMove")

		//Act
		game.start()
		game.playTurn()
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
		game.playTurn()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should re-enable board when AI has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())

		//Act
		game.start()
		game.playTurn()
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
		game.playTurn()

		//Assert
		expect(hasThreeInARow).toHaveBeenCalledTimes(1)
	})

	it("should check if there are three in a row after AI turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock())
		const hasThreeInARow = jest.spyOn(game, "hasThreeInARow")

		//Act
		game.start()
		game.playTurn()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(hasThreeInARow).toHaveBeenCalledTimes(2)
	})

	it("should return player as winner if there are three circles in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())
		jest.spyOn(boardMock, "hasThreeInARow").mockReturnValueOnce("circle")

		//Act
		game.start()
		const winner = game.hasThreeInARow()

		//Assert
		expect(winner).toBe("Player")
	})

	it("should return AI as winner if there are three crosses in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())
		jest.spyOn(boardMock, "hasThreeInARow").mockReturnValueOnce("cross")

		//Act
		game.start()
		const winner = game.hasThreeInARow()

		//Assert
		expect(winner).toBe("AI")
	})

	it("should disable the board when there are three in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock())
		jest.spyOn(game, "hasThreeInARow").mockReturnValueOnce("Player")

		//Act
		game.start()
		game.playTurn()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})