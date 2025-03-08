/**
 * Determines if a given number is odd or even.
 * Performs input validation and returns an appropriate message.
 *
 * @param {any} num - The input which can be a number or a string representation of a number.
 * @returns {string} A message indicating whether the number is odd or even,
 * or an error message if the input is invalid.
 */
export function oddOrEven(num) {
    // Check if input is null or, if it's a string, empty after trimming.
    if (num === null || (typeof num === "string" && num.trim() === "")) {
      return "Please enter a valid number.";
    }
  
    // Convert input to a number using Number(). This handles both number types and numeric strings.
    const convertedNum = Number(num);
  
    // Check if the conversion resulted in a valid number.
    if (isNaN(convertedNum)) {
      return "Please enter a valid number.";
    }
  
    // Check if the number is an integer (a whole number).
    if (!Number.isInteger(convertedNum)) {
      return "Please enter a whole number.";
    }
  
    // Return whether the number is odd or even.
    return convertedNum % 2 === 0
      ? `The number ${convertedNum} is Even.`
      : `The number ${convertedNum} is Odd.`;
  }
  