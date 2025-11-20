/**
 * Unit tests for the game board.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/view/board/board.js"

describe("Board", () => {
	it("should call draw method when player clicks on an empty tile", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)

		const markNought = jest.spyOn(board, "markNought")

		//Act
		board.tiles[0].click()

		//Assert
		expect(markNought).toHaveBeenCalled()
	})

	it("should draw a mark on the tile the player clicked on", () => {
		//Arrange
		const board = new Board()
		const clickedTile = board.tiles[0]

		//Act
		board.markNought(clickedTile)

		//Assert
		expect(clickedTile.marked).toBe(true)
		expect(clickedTile.innerHTML).toContain("svg")
	})

	it("should not draw a new mark if tile is already marked", () => {
		//Arrange
		const board = new Board()
		const tile = board.tiles[0]

		//Act
		board.markNought(tile)
		board.markNought(tile)

		//Assert
		const marks = tile.innerHTML.split("</svg>")
		expect(tile.marked).toBe(true)
		expect(marks.length).toBe(2) // Fix later
	})

	it("should fire event when player has clicked on a tile", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)
		
		const fireEvent = jest.spyOn(board, "fireEvent")

		//Act
		board.tiles[0].click()
		
		//Assert
		expect(fireEvent).toHaveBeenCalledTimes(1)
	})
})