
function oddOrEven(num) {
    // Check if input is a valid number
    if (isNaN(num)) {
        return "Please enter a valid number.";
    }

    // Check if the input is a whole number
    if (!Number.isInteger(parseFloat(num))) {
        return "Please enter a whole number.";
    }

    // Convert input to integer for modulo operation
    const parsedNum = parseInt(num, 10);

    // Check if the number is odd or even
    if (parsedNum % 2 === 0) {
        return `The number ${parsedNum} is Even.`;
    } else {
        return `The number ${parsedNum} is Odd.`;
    }
}

// Handle button click to display the result
document.getElementById('checkButton').addEventListener('click', () => {
    const userInput = document.getElementById('numberInput').value;
    const result = oddOrEven(userInput);
    document.getElementById('result').textContent = result;
});
