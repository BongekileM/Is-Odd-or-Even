function oddOrEven(num){
    if ((Math.abs(num % 2) == 1)) {
        return "The number "+ num +" is Odd";
    } else if (num % 2 == 0) {
        return "The number "+ num +" is Even";
    } else {
        return "The entered value is invalid.";
    }
} 
console.log(oddOrEven(11));