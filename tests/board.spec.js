/**
 * Unit tests for the game board.
 */

import { describe, it, expect, jest } from "@jest/globals"
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

	it("should fire event if there are three marks in a row", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)
		const mock = jest.fn()
		document.addEventListener("three-in-row", mock)

		//Act
		const humanPlayed = new CustomEvent("human-played", { bubbles: true, composed: true })
		document.documentElement.dispatchEvent(humanPlayed)

		//Assert
		expect(mock).toHaveBeenCalledTimes(1)
	})
})