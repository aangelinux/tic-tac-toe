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
		const board = new Board() // mock instead ??
		const ai = new AI(new RandomStub())

		//Act
		const tile = ai.play(board)

		//Assert
		expect(tile).toBeInstanceOf(HTMLElement) // change to Tile class later
	})

	it("should choose a new tile if tile is already marked", () => {
		//Arrange
		const board = new Board() // mock?
		const ai = new AI(new RandomStub)
		const randomize = jest.spyOn(ai, "randomize")
		jest.spyOn(Board.prototype, "isMarked").mockReturnValueOnce(true)
		jest.spyOn(Board.prototype, "isMarked").mockReturnValueOnce(true)

		//Act
		ai.play(board)

		//Assert
		expect(randomize).toHaveBeenCalledTimes(2)
	})
})