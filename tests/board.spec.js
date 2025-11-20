/**
 * Unit tests for the game board.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Board } from "../src/view/board/board.js"

describe("Board", () => {
	it("should fire event when player has clicked on a tile", () => {
		//Arrange
		const board = new Board()
		document.body.appendChild(board)
		
		const fireEvent = jest.spyOn(board, "fireEvent")

		//Act
		board.dispatchEvent(new Event("click"))
		
		//Assert
		expect(fireEvent).toHaveBeenCalledTimes(1)
	})
})