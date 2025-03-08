import readline from 'readline';
import { oddOrEven } from './script.js';

// Helper to wrap rl.question in a promise
function questionAsync(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function askQuestion() {
  // Create the readline interface here so that tests can override createInterface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  while (true) {
    const userInput = await questionAsync(rl, 'Enter a number (or type "exit" to quit): ');
    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return "Goodbye!";
    }
    
    const result = oddOrEven(userInput);
    console.log(result);
    // If the input is valid, close and return the result.
    if (result !== "Please enter a valid number." && result !== "Please enter a whole number.") {
      rl.close();
      return result;
    }
    // Otherwise, loop again to re-prompt.
  }
}

// Only start the function if not in a test environment
if (process.env.NODE_ENV !== "test") {
  askQuestion().then(() => process.exit(0));
}

export { askQuestion };
