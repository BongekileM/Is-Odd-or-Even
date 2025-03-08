/**
 * @file main.test.js
 * @description Test suite for terminal interaction behavior in main.js.
 *
 * This suite simulates user input via a mocked readline interface and validates:
 * 1. That the program exits when "exit" is input.
 * 2. That a valid input (e.g., "15") produces the correct output, followed by an exit.
 * 3. That an invalid input triggers an appropriate error message, then exits.
 * 4. That multiple invalid inputs are handled properly before eventually exiting.
 *
 * The readline.createInterface method is mocked so that askQuestion uses our custom responses.
 */

import readline from "readline";
import { jest } from "@jest/globals";
import { askQuestion } from "./main.js";

describe("Terminal interaction", () => {
  let mockReadline;
  let consoleSpy;

  beforeEach(() => {
    // Spy on console.log to suppress output during tests and enable assertions on logged messages.
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Create a mock readline interface with custom implementations for question, close, and on.
    mockReadline = {
      question: jest.fn(),
      close: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "close") setImmediate(callback); // Ensure readline closure is detected
      }),
    };

    // Override readline.createInterface so that askQuestion uses our mock interface.
    jest.spyOn(readline, "createInterface").mockReturnValue(mockReadline);
  });

  afterEach(() => {
    // Restore mocks after each test to ensure a clean state.
    jest.restoreAllMocks();
  });

  test("Exits when 'exit' is entered", async () => {
    // Simulate immediate user input "exit".
    mockReadline.question.mockImplementation((_, callback) => callback("exit"));

    const result = await askQuestion();
    
    // Verify that the program logs "Goodbye!", closes the interface, and returns "Goodbye!".
    expect(result).toBe("Goodbye!");
    expect(consoleSpy).toHaveBeenCalledWith("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles valid input then exit", async () => {
    let callCount = 0;
    // Simulate a valid input ("15") on the first prompt and "exit" on the second.
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("15"); // Valid input; expect oddOrEven("15") to log "The number 15 is Odd."
      } else {
        callback("exit");
      }
      callCount++;
    });
  
    const result = await askQuestion();
    
    // Verify the expected output and proper termination.
    expect(consoleSpy).toHaveBeenCalledWith("The number 15 is Odd.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });    

  test("Handles invalid input", async () => {
    let callCount = 0;
    // Simulate an invalid input ("abc") followed by "exit".
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("abc");  // Invalid input should cause an error message.
      } else {
        callback("exit");
      }
      callCount++;
    });

    const result = await askQuestion();
    
    // Verify that the error message is logged, and that the program eventually exits.
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles multiple invalid inputs before exit", async () => {
    // Simulate a series of invalid inputs followed by "exit".
    const responses = ["abc", "", "   ", "exit"];
    
    // Use mockImplementationOnce to return each response sequentially.
    responses.forEach(response => {
      mockReadline.question.mockImplementationOnce((_, callback) => callback(response));
    });
    
    const result = await askQuestion();
    
    // Verify that an invalid input message is logged and that the program eventually returns "Goodbye!".
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });
});
