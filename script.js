
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
    return parsedNum % 2 === 0
        ? `The number ${parsedNum} is Even.`
        : `The number ${parsedNum} is Odd.`;
}

// Handle button click to display the result
document.getElementById('checkButton').addEventListener('click', () => {
    const userInput = document.getElementById('numberInput').value;
    const result = oddOrEven(userInput);
    document.getElementById('result').textContent = result;
});

// Handle Enter key press to trigger the check
document.getElementById('numberInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('numberInput').value;
        const result = oddOrEven(userInput);
        document.getElementById('result').textContent = result;
    }
});
