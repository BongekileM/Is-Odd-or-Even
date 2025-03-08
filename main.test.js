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
                if (event === "close") setImmediate(callback);  // ✅ Ensure readline closure is detected
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
});
