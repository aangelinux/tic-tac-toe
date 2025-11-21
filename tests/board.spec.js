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
})