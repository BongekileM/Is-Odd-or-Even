export function oddOrEven(num) {
    
    // Check for empty input, spaces, or null
    if (num === null || num.toString().trim() === "") {
        return "Please enter a valid number.";
    }

    // Check if input is a valid number
    if (isNaN(num)) {
        return "Please enter a valid number.";
    }

    // Check if input is a whole number
    if (!Number.isInteger(parseFloat(num))) {
        return "Please enter a whole number.";
    }

    // Convert input to integer for modulo operation
    const parsedNum = parseInt(num, 10);

    // Check if the number is odd or even
    return parsedNum % 2 === 0
        ? `The number ${parsedNum} is Even.`
        : `The number ${parsedNum} is Odd.`;
}
