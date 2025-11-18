/**
 * Unit tests.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/board"
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

beforeEach(() => {
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)

  const html = fs.readFileSync(path.resolve(__dirname, "../public/index.html"), "utf8")
  document.documentElement.innerHTML = html
})

describe("Board", () => {
	it("should call draw method when player clicks on an empty tile", () => {
		//Arrange
		const board = new Board()

		//Act
		const click = new Event("click")
		const targetTile = board.tiles[0]
		targetTile.dispatchEvent(click)
		const spy = jest.spyOn(board, "drawMark")

		//Assert
		expect(spy).toHaveBeenCalled()
	})

	it("should draw a mark on the tile the player clicked on", () => {
		//Arrange
		const board = new Board()

		//Act
		const clickedTile = board.tiles[0]
		board.drawMark(clickedTile)

		//Assert
		expect(clickedTile.marked).toBe(true)
	})
})