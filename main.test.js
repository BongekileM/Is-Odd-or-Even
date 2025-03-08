/**
 * @file main.test.js
 * @description This test suite verifies the terminal interaction behavior in main.js.
 *
 * The tests simulate user input via a mocked readline interface and check:
 * - That the program exits when "exit" is entered.
 * - That valid numeric input is processed correctly.
 * - That invalid input (non-numeric, empty, or non-whole numbers) produces the expected error messages.
 * - That multiple invalid inputs are handled before eventually exiting.
 */

import readline from "readline";
import { jest } from "@jest/globals";
import { askQuestion } from "./main.js";

describe("Terminal interaction", () => {
  let mockReadline;
  let consoleSpy;

  beforeEach(() => {
    // Spy on console.log to capture output without printing to the console during tests.
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Create a mock readline interface with custom implementations.
    mockReadline = {
      question: jest.fn(),
      close: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "close") setImmediate(callback); // Ensure readline closure is detected
      }),
    };

    // Override the readline.createInterface to use our mock.
    jest.spyOn(readline, "createInterface").mockReturnValue(mockReadline);
  });

  afterEach(() => {
    // Restore mocks after each test for a clean state.
    jest.restoreAllMocks();
  });

  test("Exits when 'exit' is entered", async () => {
    // Simulate user entering "exit" immediately.
    mockReadline.question.mockImplementation((_, callback) => callback("exit"));

    const result = await askQuestion();

    // Verify that the program logs "Goodbye!", calls close, and returns "Goodbye!".
    expect(result).toBe("Goodbye!");
    expect(consoleSpy).toHaveBeenCalledWith("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles valid input then exit", async () => {
    let callCount = 0;
    // Simulate valid input "15" followed by "exit".
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("15"); // Valid input; oddOrEven("15") should log "The number 15 is Odd."
      } else {
        callback("exit");
      }
      callCount++;
    });

    const result = await askQuestion();

    // Check that the valid result is logged, and that the program eventually exits.
    expect(consoleSpy).toHaveBeenCalledWith("The number 15 is Odd.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles invalid input", async () => {
    let callCount = 0;
    // Simulate an invalid input ("abc") followed by "exit".
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("abc");  // Invalid input should trigger "Please enter a valid number."
      } else {
        callback("exit");
      }
      callCount++;
    });

    const result = await askQuestion();

    // Verify the expected error message and proper exit.
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles multiple invalid inputs before exit", async () => {
    // Simulate several invalid inputs followed by "exit".
    const responses = ["abc", "", "   ", "exit"];

    // Use mockImplementationOnce to sequentially return each response.
    responses.forEach(response => {
      mockReadline.question.mockImplementationOnce((_, callback) => callback(response));
    });

    const result = await askQuestion();

    // Verify that the error message for invalid input is logged at least once,
    // and that the program eventually exits.
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles decimal input before exit", async () => {
    // Simulate a decimal input ("15.5") followed by "exit"
    mockReadline.question
      .mockImplementationOnce((_, callback) => callback("15.5"))
      .mockImplementationOnce((_, callback) => callback("exit"));

    const result = await askQuestion();

    // Expect the error message for non-whole numbers to be logged.
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a whole number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });
});
