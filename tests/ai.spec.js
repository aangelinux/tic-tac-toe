/**
 * Unit tests for the AI player.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/view/board.js"
import { AI } from "../src/model/ai.js"
import { RandomStub } from "./__mocks__/random.js"

describe("AI", () => {
	it("should choose a random tile during their turn", () => {
		//Arrange
		const board = new Board()
		const ai = new AI(new RandomStub())

		//Act
		const tile = ai.play(board)

		//Assert
		expect(tile).toBeInstanceOf(HTMLElement) // change to Tile class later
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