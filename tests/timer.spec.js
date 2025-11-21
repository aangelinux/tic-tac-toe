/**
 * Unit tests for the game timer.
 */

import { describe, it, expect, jest } from "@jest/globals"

describe("Timer", () => {
	it("should be able to start a timer", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 2000

		jest.spyOn(global, "setTimeout")
		jest.useFakeTimers()

		//Act
		timer.on(milliSeconds)
		
		//Assert
		expect(setTimeout).toHaveBeenCalledTimes(1)
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), milliSeconds)
	})
})