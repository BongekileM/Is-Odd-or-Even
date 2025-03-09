# Is-Odd-or-Even ✨
A simple JavaScript CLI program that determines whether a given number is odd or even.

![GirlCode logo](girlcode.png "Logo")

## Overview 🚀
This CLI program prompts the user to enter a number and determines if the number is odd or even.t was developed as a practice exercise at GirlCode.

## Features 🌟
- **Interactive CLI:** Continuously prompts for user input until "exit" is entered.
- **Input Validation:** Handles various invalid cases (e.g., non-numeric values, decimals, empty inputs) with clear error messages.
- **Unit Tested:** Includes comprehensive tests using Jest to verify both the core logic and terminal interactions.

## Built With 🛠️
- **JavaScript (ES Modules)**
- **Node.js**
- **Jest**(for testing)

## Getting Started 💻

### Prerequisites 🔍
- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation 📦
1. **Clone the repository:**
    ```bash
    git clone https://github.com/BongekileM/is-odd-or-even.git
2. **Navigate into the project directory:**
    ```bash
    cd is-odd-or-even
3. **Install dependencies:**
    ```bash
    npm install

### Running the Application ▶️
To run the program, use the following command:
```bash
npm start
```
You will see the prompt:
```bash
Enter a number (or type "exit" to quit):
```
### Expected Inputs 📌

✔ **Valid Input Example:**  
Entering 15 displays: 
```bash
The number 15 is Odd.
```

❌ **Invalid Input Example:**  
Entering 15.5 displays:
```bash
Please enter a whole number.
```
🚪 **Exit:**  
Type `"exit"` to terminate the program. 

### Testing 🧪
This project includes a full test suite with Jest. To run the tests, execute:
```bash
npm test
```
This will run all test cases for both the core logic and CLI interactions.

---
Created by [Bongekile Mncube](https://github.com/BongekileM)



