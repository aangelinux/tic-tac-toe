/**
 * Unit tests for the board tiles.
 */

import { describe, it, expect, jest } from "@jest/globals"

describe("Tile", () => {
	it("should check if tile is marked when player clicks on it", () => {
		//Arrange
		const tile = new Tile()
		const isMarked = jest.spyOn(tile, "isMarked")

		//Act
		const click = new Event("click")
		tile.dispatchEvent(click)

		//Assert
		expect(isMarked).toHaveBeenCalledTimes(1)
	})
})