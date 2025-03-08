import readline from "readline";
import { jest } from "@jest/globals";
import { askQuestion } from "./main.js";

describe("Terminal interaction", () => {
  let mockReadline;
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    mockReadline = {
      question: jest.fn(),
      close: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "close") setImmediate(callback); // Ensure readline closure is detected
      }),
    };

    jest.spyOn(readline, "createInterface").mockReturnValue(mockReadline);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Exits when 'exit' is entered", async () => {
    mockReadline.question.mockImplementation((_, callback) => callback("exit"));

    const result = await askQuestion();
    
    expect(result).toBe("Goodbye!");
    expect(consoleSpy).toHaveBeenCalledWith("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles valid input then exit", async () => {
    let callCount = 0;
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("15"); // Valid input; oddOrEven("15") returns "The number 15 is Odd."
      } else {
        callback("exit");
      }
      callCount++;
    });
  
    const result = await askQuestion();
    
    expect(consoleSpy).toHaveBeenCalledWith("The number 15 is Odd.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });    

  test("Handles invalid input", async () => {
    let callCount = 0;
    mockReadline.question.mockImplementation((_, callback) => {
      if (callCount === 0) {
        callback("abc");  // Invalid input
      } else {
        callback("exit");  // Exit input
      }
      callCount++;
    });

    const result = await askQuestion();
    
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });

  test("Handles multiple invalid inputs before exit", async () => {
    const responses = ["abc", "", "   ", "exit"];
    
    responses.forEach(response => {
      mockReadline.question.mockImplementationOnce((_, callback) => callback(response));
    });
    
    const result = await askQuestion();
    
    // Check that the invalid message is logged at least once.
    expect(consoleSpy).toHaveBeenCalledWith("Please enter a valid number.");
    expect(result).toBe("Goodbye!");
    expect(mockReadline.close).toHaveBeenCalled();
  });
});
