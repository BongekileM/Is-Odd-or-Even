import readline from 'readline';
import { oddOrEven } from './script.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number: ', (userInput) => {
    console.log(oddOrEven(userInput));
    rl.close();
});
