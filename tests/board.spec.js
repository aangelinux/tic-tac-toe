/**
 * Unit tests for the game board.
 */

import { describe, it, expect } from "@jest/globals"
import { Board } from "../src/view/board/board.js"
import { Tile } from "../src/view/tile/tile.js"

describe("Board", () => {
	it("should create Tile objects", () => {
		//Arrange
		const board = new Board()
		const size = 9

		//Act
		board.draw(size)

		//Assert
		expect(board.tiles).toHaveLength(size)
		expect(board.tiles[0]).toBeInstanceOf(Tile)
	})

	it("should check if there are three crosses in a row", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)

		//Act
		board.tiles[0].markCross()
		board.tiles[1].markCross()
		board.tiles[2].markCross()
		const mark = board.hasThreeInARow()

		//Assert
		expect(mark).toBe("cross")
	})
})