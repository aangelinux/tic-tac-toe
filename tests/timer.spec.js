/**
 * Unit tests for the game timer.
 */

import { describe, it, expect, jest, afterEach, beforeEach } from "@jest/globals"
import { Timer } from "../src/model/timer"

describe("Timer", () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	it("should be able to start a timer", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 200
		jest.spyOn(global, "setTimeout")

		//Act
		timer.on(milliSeconds, jest.fn())
		
		//Assert
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), milliSeconds)
	})

	it("should invoke the callback when timer runs out", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 200
		const mock = jest.fn()

		//Act
		timer.on(milliSeconds, mock)
		jest.advanceTimersByTime(milliSeconds)
		
		//Assert
		expect(mock).toHaveBeenCalledTimes(1)	
	})

	afterEach(() => {
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})