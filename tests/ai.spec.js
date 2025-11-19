/**
 * Unit tests for the AI player.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/view/board.js"
import { RandomStub } from "./__mocks__/random.js"

describe("AI", () => {
	it("should mark a random tile during their turn", () => {
		//Arrange
		const board = new Board()
		const ai = new AI(new RandomStub())

		//Act
		ai.play()

		//Assert
		expect(board.tiles[8].marked).toBeTruthy()
	})

	it("should not mark a taken tile", () => {
		//Arrange
		const board = new Board(new RandomStub)
		const tile = board.tiles[0]

		//Act
		board.markRandom(tile)
		board.markRandom(tile)

		//Assert
		const marks = tile.innerHTML.split("</svg>")
		expect(tile.marked).toBe(true)
		expect(marks.length).toBe(2) // Fix later
	})
})