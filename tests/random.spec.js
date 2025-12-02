/**
 * Unit tests for the randomizer.
 */

import { describe, it, expect } from "@jest/globals"
import { Random } from "../src/model/random.js"

describe("Random", () => {
	it("should generate a number less than or equal to the max", () => {
		//Arrange
		const random = new Random()
		random.max = 8

		//Act
		const value = random.value

		//Assert
		expect(value).toBeLessThanOrEqual(8)	
	})

	it("should generate a number greater than or equal to 0", () => {
		//Arrange
		const random = new Random()
		random.max = 8

		//Act
		const value = random.value

		//Assert
		expect(value).toBeGreaterThanOrEqual(0)	
	})
})