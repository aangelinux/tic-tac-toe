/**
 * Unit tests for the game timer.
 */

import { describe, it, expect, jest, afterEach } from "@jest/globals"
import { Timer } from "../src/model/timer"

describe("Timer", () => {
	it("should be able to start a timer", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 200
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
		const milliSeconds = 200
		const mock = jest.fn()

		jest.useFakeTimers()

		//Act
		timer.on(milliSeconds, mock)
		jest.advanceTimersByTime(milliSeconds)
		
		//Assert
		expect(mock).toHaveBeenCalledTimes(1)	
	})

	it("should check if timer is currently running", () => {
		//Arrange
		const timer = new Timer()
		const milliSeconds = 200
		const mock = jest.fn()
		const isRunning = jest.spyOn(timer, "isRunning")

		jest.useFakeTimers()

		//Act
		timer.on(milliSeconds, mock)
		
		//Assert
		expect(isRunning).toHaveBeenCalledTimes(1)			
	})

	afterEach(() => {
		jest.clearAllMocks()
	})
})