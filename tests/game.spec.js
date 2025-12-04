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
	
	it("should start a timer when human player marks a tile", () => {
		//Arrange
		const timerMock = new TimerMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), timerMock, new UIMock())
		const timer = jest.spyOn(timerMock, "on")

		//Act
		game.start()
		game.play()

		//Assert
		expect(timer).toHaveBeenCalledTimes(1)
	})

	it("should disable the board from human player until AI has played", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.play()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should check if there are three marks in a row after each turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		const hasWinner = jest.spyOn(game, "hasWinner")

		//Act
		game.start()
		game.play()

		//Assert
		expect(hasWinner).toHaveBeenCalledTimes(1)
	})

	it("should return human as winner if there are three circles in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		jest.spyOn(boardMock, "hasThreeInARow").mockReturnValueOnce("circle")
		game.start()
		const winner = game.hasWinner()

		//Assert
		expect(winner).toBe("Human")
	})

	it("should disable the board when there are three in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		jest.spyOn(game, "hasWinner").mockReturnValueOnce("Human")
		game.start()
		game.play()

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should not enable the board if turn nr equals or exceeds nr of tiles", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		const nrOfTiles = 2
		boardMock.size = nrOfTiles
		jest.useFakeTimers()

		//Act
		boardMock.draw(nrOfTiles)
		game.start()
		game.play()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	it("should not enable the board if all tiles are marked", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		jest.useFakeTimers()

		//Act
		boardMock.draw(2)
		boardMock.tiles[0].markCircle()
		game.play()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")
	})

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})


describe("Game AI", () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	it("should let AI mark a tile when the timer runs out", () => {
		//Arrange
		const boardMock = new BoardMock()
		const randomStub = new RandomStub()
		const game = new Game(boardMock, new AIMock(randomStub), new TimerMock(), new UIMock())
		const tileAI = 8

		//Act
		randomStub.max = tileAI
		game.start()
		game.play()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[tileAI].svg.querySelector("line")).toBeInstanceOf(SVGElement)
	})

	it("should re-enable the board when AI has marked a tile", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.play()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).not.toHaveAttribute("disabled")
	})

	it("should not re-enable the board if AI has three in a row", () => {
		//Arrange
		const boardMock = new BoardMock()
		const game = new Game(boardMock, new AIMock(new RandomStub()), new TimerMock(), new UIMock())

		//Act
		game.start()
		game.play()
		jest.spyOn(game, "hasWinner").mockReturnValueOnce("AI")
		jest.advanceTimersByTime(1000)

		//Assert
		expect(boardMock.tiles[0]).toHaveAttribute("disabled")		
	})

	it("should check if there are three marks in a row after AI's turn", () => {
		//Arrange
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), new UIMock())
		const hasWinner = jest.spyOn(game, "hasWinner")

		//Act
		game.start()
		game.play()
		jest.advanceTimersByTime(1000)

		//Assert
		expect(hasWinner).toHaveBeenCalledTimes(2)
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

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})


describe("Game UI", () => {
	it("should dispatch an event on the UI when a new turn starts", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const handler = jest.fn()
		uiMock.addEventListener("new-turn", handler)

		//Act
		game.start()
		game.play()

		//Assert
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it("should increase turn number by 1 when a new turn starts", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const handler = jest.fn()
		uiMock.addEventListener("new-turn", handler)

		//Act
		game.start()
		game.play()
		const event = handler.mock.calls[0][0]

		//Assert
		expect(event.detail.turn).toBe(2)
	})

	it("should toggle the 'current player' value between human and AI every turn", () => {
		//Arrange
		const uiMock = new UIMock()
		const game = new Game(new BoardMock(), new AIMock(new RandomStub()), new TimerMock(), uiMock)
		const handler = jest.fn()
		uiMock.addEventListener("new-turn", handler)

		//Act
		game.start()
		game.play()
		const event = handler.mock.calls[0][0]

		//Assert
		expect(event.detail.player).toBe("AI")		
	})

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})