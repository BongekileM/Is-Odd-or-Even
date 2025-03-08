/**
 * @file script.test.js
 * @description Test suite for the oddOrEven function.
 * Verifies correct responses for various valid and invalid inputs.
 */

import { oddOrEven } from "./script.js";

describe("oddOrEven", () => {
  const testCases = [
    { input: 10, expected: "The number 10 is Even." },
    { input: 11, expected: "The number 11 is Odd." },
    { input: -70, expected: "The number -70 is Even." },
    { input: -15, expected: "The number -15 is Odd." },
    { input: 14.5, expected: "Please enter a whole number." },
    { input: -30.6, expected: "Please enter a whole number." },
    { input: "18,9", expected: "Please enter a valid number." },
    { input: "hello", expected: "Please enter a valid number." },
    { input: {}, expected: "Please enter a valid number." },
    { input: ".", expected: "Please enter a valid number." },
    { input: 999999999999, expected: "The number 999999999999 is Odd." },
    { input: 0, expected: "The number 0 is Even." },
    { input: "", expected: "Please enter a valid number." },
    { input: " ", expected: "Please enter a valid number." },
    { input: null, expected: "Please enter a valid number." }
  ];

  test.each(testCases)(
    "returns '$expected' for input $input",
    ({ input, expected }) => {
      expect(oddOrEven(input)).toBe(expected);
    }
  );
});
