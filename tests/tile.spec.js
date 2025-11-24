/**
 * Unit tests for the board tiles.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Tile } from "../src/view/tile/tile"

describe("Tile", () => {
	it("should set width and height when appended to the DOM", () => {
		//Arrange
		const tile = new Tile()
		const setSize = jest.spyOn(tile, "setSize")

		//Act
		document.body.appendChild(tile)

		//Assert
		expect(setSize).toHaveBeenCalledTimes(1)
		expect(tile).toHaveProperty("height")
		expect(tile).toHaveProperty("width")
	})

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

	it("should draw circle when player clicks on an empty tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		jest.spyOn(tile, "isMarked").mockReturnValueOnce(false)
		const mark = jest.spyOn(tile, "markCircle")

		//Act
		tile.click()

		//Assert
		expect(mark).toHaveBeenCalledTimes(1)
		expect(tile.svg.querySelector("circle")).toBeInstanceOf(SVGElement)
	})

	it("should do nothing when player clicks on marked tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		jest.spyOn(tile, "isMarked").mockReturnValueOnce(true)
		const mark = jest.spyOn(tile, "markCircle")

		//Act
		tile.click()

		//Assert
		expect(mark).not.toHaveBeenCalled()
	})

	it("should fire event when a tile has been marked", () => {
		//Arrange
		const mock = jest.fn()
		document.addEventListener("human-played", mock)

		const tile = new Tile()
		document.body.appendChild(tile)

		//Act
		tile.click()
		
		//Assert
		expect(mock).toHaveBeenCalledTimes(1)
	})

	it("should draw cross when AI picks a tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		//Act
		tile.markCross()

		//Assert
		expect(tile.svg.querySelector("line")).toBeInstanceOf(SVGElement)		
	})

	it("should be unclickable while disabled", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		const emitEvent = jest.spyOn(tile, "emitEvent")
		
		//Act
		tile.disable()
		tile.click()

		//Expect
		expect(emitEvent).not.toHaveBeenCalled()
	})

	it("should be clickable while enabled", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		const emitEvent = jest.spyOn(tile, "emitEvent")
		
		//Act
		tile.disable()
		tile.click()
		tile.enable()
		tile.click()

		//Expect
		expect(emitEvent).toHaveBeenCalledTimes(1)		
	})
})