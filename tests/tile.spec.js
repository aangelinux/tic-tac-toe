/**
 * Unit tests for the board tiles.
 */

import { describe, it, expect, jest, afterEach } from "@jest/globals"
import { Tile } from "../src/view/tile/tile"

describe("Tile", () => {
	it("should set its width and height when appended to the DOM", () => {
		//Arrange
		const tile = new Tile()

		//Act
		document.body.appendChild(tile)

		//Assert
		expect(tile).toHaveProperty("height")
		expect(tile).toHaveProperty("width")
	})

	it("should check if it's empty or marked when the player clicks on it", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		const isMarked = jest.spyOn(tile, "isMarked")

		//Act
		tile.click()

		//Assert
		expect(isMarked).toHaveBeenCalledTimes(1)
	})

	it("should draw a circle when the player clicks on an empty tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)

		//Act
		tile.click()

		//Assert
		expect(tile.svg.querySelector("circle")).toBeInstanceOf(SVGElement)
	})

	it("should do nothing when the player clicks on marked tile", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		const mark = jest.spyOn(tile, "markCircle")

		//Act
		jest.spyOn(tile, "isMarked").mockReturnValueOnce(true)
		tile.click()

		//Assert
		expect(mark).not.toHaveBeenCalled()
	})

	it("should fire an event when the player marks a tile", () => {
		//Arrange
		const tile = new Tile()
		const mock = jest.fn()
		document.body.appendChild(tile)
		document.addEventListener("human-played", mock)

		//Act
		tile.click()
		
		//Assert
		expect(mock).toHaveBeenCalledTimes(1)
	})

	it("should draw a cross when the AI picks a tile", () => {
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

		//Assert
		expect(emitEvent).not.toHaveBeenCalled()
	})

	it("should be clickable while enabled", () => {
		//Arrange
		const tile = new Tile()
		document.body.appendChild(tile)
		const emitEvent = jest.spyOn(tile, "emitEvent")
		
		//Act
		tile.enable()
		tile.click()

		//Assert
		expect(emitEvent).toHaveBeenCalledTimes(1)		
	})

	afterEach(() => {
		document.body.innerHTML = ""
		jest.clearAllMocks()
	})
})