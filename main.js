import readline from 'readline';
import { oddOrEven } from './script.js';

function questionAsync(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function askQuestion() {
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
    // Instead of returning immediately when in test mode,
    // continue looping until "exit" is entered.
  }
}

if (process.env.NODE_ENV !== "test") {
  askQuestion().then(() => process.exit(0));
}

export { askQuestion };

