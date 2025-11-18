/**
 * Unit tests for the game board.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/view/board.js"
import "../src/view/board.js"

beforeEach(() => {
  document.documentElement.innerHTML = "<game-board></game-board>"
})

describe("Board", () => {
	it("should call draw method when player clicks on an empty tile", () => {
		//Arrange
		const board = new Board()
		const spy = jest.spyOn(board, "mark")

		//Act
		board.connectedCallback()
		const click = new Event("click")
		board.tiles[0].dispatchEvent(click)

		//Assert
		expect(spy).toHaveBeenCalled()
	})

	it("should draw a mark on the tile the player clicked on", () => {
		//Arrange
		const board = new Board()
		const clickedTile = board.tiles[0]

		//Act
		board.mark(clickedTile)

		//Assert
		expect(clickedTile.marked).toBe(true)
		expect(clickedTile.innerHTML).toContain("svg")
	})

	it("should not draw a new mark if tile is already marked", () => {
		//Arrange
		const board = new Board()
		const clickedTile = board.tiles[0]

		//Act
		board.mark(clickedTile)
		board.mark(clickedTile)

		//Assert
		const marks = clickedTile.innerHTML.split("</svg>")
		expect(clickedTile.marked).toBe(true)
		expect(marks.length).toBe(2) // Fix later
	})
})

describe("AI", () => {
	it("should mark a random empty tile during their turn", () => {
		//Arrange
		const board = new Board()
		const spy = jest.spyOn(board, "markRandom")

		//Act
		board.connectedCallback()
		const click = new Event("click")
		board.tiles[0].dispatchEvent(click)

		//Assert
		expect(spy).toHaveBeenCalled()
	})
})