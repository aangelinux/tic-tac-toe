/**
 * Unit tests for the AI player.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { AI } from "../src/model/ai.js"
import { RandomStub } from "./__mocks__/random.js"
import { BoardMock } from "./__mocks__/board.js"
import { Tile } from "../src/view/tile/tile.js" // mock later

describe("AI", () => {
	it("should choose a random tile during their turn", () => {
		//Arrange
		const boardMock = new BoardMock()
		const ai = new AI(new RandomStub())

		//Act
		boardMock.draw(9)
		const tile = ai.play(boardMock)

		//Assert
		expect(tile).toBeInstanceOf(Tile) // change to Tile class later
	})

	it("should choose a new tile if tile is already marked", () => {
		//Arrange
		const boardMock = new BoardMock()
		const ai = new AI(new RandomStub)
		const randomize = jest.spyOn(ai, "randomize")

		//Act
		jest.spyOn(boardMock, "isMarked").mockReturnValueOnce(true)
		ai.play(boardMock)

		//Assert
		expect(randomize).toHaveBeenCalledTimes(1)
	})
})