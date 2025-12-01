/**
 * Unit tests for the game controller.
 */

import '@testing-library/jest-dom'
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { Game } from "../src/controller/game"
import { BoardMock } from "./__mocks__/board.js"
import { AIMock } from "./__mocks__/ai.js"
import { RandomStub } from "./__mocks__/random.js"
import { TimerMock } from "./__mocks__/timer.js"
import { UIMock } from './__mocks__/ui.js'

describe("Game", () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	it("should attach UI and Board to the DOM when game starts", () => {
		//Arrange
		const boardMock = new BoardMock()
		const uiMock = new UIMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), uiMock)

		//Act
		game.start()

		//Assert
		expect(boardMock).toBeInTheDocument()
		expect(uiMock).toBeInTheDocument()
	})
	
	it("should start a timer when player marks a tile", () => {
		//Arrange
		const timerMock = new TimerMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), timerMock, new UIMock())
		const timer = jest.spyOn(timerMock, "on")

		//Act
		game.start()
		game.playTurn()

		//Assert
		expect(timer).toHaveBeenCalledTimes(1)
	})

	it("should let AI mark a tile when timer runs out", () => {
		//Arrange
		const boardMock = new BoardMock()
		const randomStub = new RandomStub()
		const game = new Game(boardMock, new AIMock(randomStub), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.playTurn()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[8].svg.querySelector("line")).toBeInstanceOf(SVGElement)
	})

	it("should disable board from player until AI has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.playTurn()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should re-enable board when AI has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.playTurn()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).not.toHaveAttribute("disabled")
	})

	it("should check if there are three in a row after player turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		const hasWinner = jest.spyOn(game, "hasWinner")

		//Act
		game.start()
		game.playTurn()

		//Assert
		expect(hasWinner).toHaveBeenCalledTimes(1)
	})

	it("should check if there are three in a row after AI turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		const hasWinner = jest.spyOn(game, "hasWinner")

		//Act
		game.start()
		game.playTurn()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(hasWinner).toHaveBeenCalledTimes(2)
	})

	it("should return player as winner if there are three circles in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		jest.spyOn(boardMock, "hasThreeInARow").mockReturnValueOnce("circle")
		game.start()
		const winner = game.hasWinner()

		//Assert
		expect(winner).toBe("Player")
	})

	it("should return AI as winner if there are three crosses in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		jest.spyOn(boardMock, "hasThreeInARow").mockReturnValueOnce("cross")
		game.start()
		const winner = game.hasWinner()

		//Assert
		expect(winner).toBe("AI")
	})

	it("should disable the board when there are three in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		jest.spyOn(game, "hasWinner").mockReturnValueOnce("Player")
		game.start()
		game.playTurn()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should dispatch an event when a new turn starts", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const mock = jest.fn()
		uiMock.addEventListener("new-turn", mock)

		//Act
		game.start()
		game.playTurn()

		//Assert
		expect(mock).toHaveBeenCalledTimes(1)
	})

	it("should increase turn number by 1 when a new turn starts", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const handler = jest.fn()
		uiMock.addEventListener("new-turn", handler)

		//Act
		game.start()
		game.playTurn()
		const event = handler.mock.calls[0][0]

		//Assert
		expect(event.detail.turn).toBe(1)
	})

	it("should toggle player property between human and AI every turn", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const handler = jest.fn()
		uiMock.addEventListener("new-turn", handler)

		//Act
		game.start()
		game.playTurn()
		const event = handler.mock.calls[0][0]

		//Assert
		expect(event.detail.player).toBe("AI")		
	})

	afterEach(() => {
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})