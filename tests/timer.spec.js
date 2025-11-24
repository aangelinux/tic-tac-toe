/**
 * Unit tests for the game timer.
 */

import { describe, it, expect, jest } from "@jest/globals"
import { Timer } from "../src/model/timer"

describe("Timer", () => {
	it("should be able to start a timer", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 2000
		const mock = jest.fn()

		jest.useFakeTimers()
		jest.spyOn(global, "setTimeout")

		//Act
		timer.on(milliSeconds, mock)
		
		//Assert
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), milliSeconds)
	})

	it("should invoke the callback when timer runs out", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 2000
		const mock = jest.fn()

		jest.useFakeTimers()

		//Act
		timer.on(milliSeconds, mock)
		jest.advanceTimersByTime(milliSeconds)
		
		//Assert
		expect(mock).toHaveBeenCalledTimes(1)	
	})
})