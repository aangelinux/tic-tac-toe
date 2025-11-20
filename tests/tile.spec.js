/**
 * Unit tests for the board tiles.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Tile } from "../src/view/tile/tile"

describe("Tile", () => {
	it("should check if it is empty or marked when player clicks on it", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		
		const isMarked = jest.spyOn(tile, "isMarked")

		//Act
		tile.click()

		//Assert
		expect(isMarked).toHaveBeenCalledTimes(1)
	})
})