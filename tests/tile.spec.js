/**
 * Unit tests for the board tiles.
 */

import "@testing-library/jest-dom"
import { describe, it, expect, jest } from "@jest/globals"
import { Tile } from "../src/view/tile/tile"

describe("Tile", () => {
	it("should check if it's empty or marked when player clicks on it", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		const isMarked = jest.spyOn(tile, "isMarked")

		//Act
		tile.click()

		//Assert
		expect(isMarked).toHaveBeenCalledTimes(1)
	})

	it("should draw a mark when player clicks on an empty tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		jest.spyOn(tile, "isMarked").mockReturnValueOnce(false)
		const mark = jest.spyOn(tile, "mark")

		//Act
		tile.click()

		//Assert
		expect(mark).toHaveBeenCalledTimes(1)
		expect(tile.querySelector("svg")).toBeInstanceOf(SVGSVGElement)
	})
})