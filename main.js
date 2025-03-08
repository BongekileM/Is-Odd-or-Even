import readline from 'readline';
import { oddOrEven } from './script.js';

/**
 * Wraps rl.question in a promise to allow for async/await usage.
 * @param {readline.Interface} rl - The readline interface instance.
 * @param {string} prompt - The prompt message to display.
 * @returns {Promise<string>} The user input.
 */
function questionAsync(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

/**
 * Continuously prompts the user for input until "exit" is entered.
 * Each input is processed with the oddOrEven function and its result is logged.
 * The function only terminates when the user inputs "exit".
 * @returns {Promise<string>} Returns "Goodbye!" when the user exits.
 */
async function askQuestion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    // Await user input and trim whitespace.
    const userInput = (await questionAsync(rl, 'Enter a number (or type "exit" to quit): ')).trim();
    
    // Exit if the user types "exit" (case-insensitive).
    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return "Goodbye!";
    }
    
    // Process the input using oddOrEven and log the result.
    const result = oddOrEven(userInput);
    console.log(result);
    
    // Loop continues, even if the input was valid, until "exit" is entered.
  }
}

// Start the prompt loop only if not in a test environment.
if (process.env.NODE_ENV !== "test") {
  askQuestion().then(() => process.exit(0));
}

export { askQuestion };
