/**
 * Unit tests for the game board.
 */

import { describe, it, expect, afterEach } from "@jest/globals"
import { Board } from "../src/view/board/board.js"
import { Tile } from "../src/view/tile/tile.js"

describe("Board", () => {
	it("should create Tile objects and store them in an array", () => {
		//Arrange
		const board = new Board()
		const tiles = 9

		//Act
		board.draw(tiles)

		//Assert
		expect(board.tiles).toHaveLength(tiles)
		expect(board.tiles[0]).toBeInstanceOf(Tile)
	})

	it("should check if it has three crosses in a row", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)

		//Act
		board.tiles[0].markCross()
		board.tiles[1].markCross()
		board.tiles[2].markCross()
		const threeInARow = board.hasThreeInARow()

		//Assert
		expect(threeInARow).toBe("cross")
	})

	it("should check if it has three circles in a row", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)

		//Act
		board.tiles[0].markCircle()
		board.tiles[1].markCircle()
		board.tiles[2].markCircle()
		const threeInARow = board.hasThreeInARow()

		//Assert
		expect(threeInARow).toBe("circle")
	})

	it("should return false if there are no three in a row", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)

		//Act
		board.tiles[0].markCircle()
		board.tiles[1].markCircle()
		const threeInARow = board.hasThreeInARow()

		//Assert
		expect(threeInARow).toBe(false)
	})

	afterEach(() => {
		document.body.innerHTML = ""
	})
})