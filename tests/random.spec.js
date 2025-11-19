/**
 * Unit tests for the randomizer.
 */

import { describe, it, expect } from "@jest/globals"
import { Random } from "../src/model/random.js"

describe("Random", () => {
	it("should not generate a value greater than number of tiles", () => {
		//Arrange
		const random = new Random()

		//Act
		random.value = 8

		//Assert
		expect(random.value).toBeLessThanOrEqual(8)
	})
})