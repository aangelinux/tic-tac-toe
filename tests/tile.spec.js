/**
 * Unit tests for the board tiles.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Tile } from "../src/view/tile/tile"

describe("Tile", () => {
	it("should check if it is empty or marked when player clicks on it", () => {
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