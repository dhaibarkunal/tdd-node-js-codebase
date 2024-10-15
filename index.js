import Calculator from "./model/calculator.mjs";

const calculator = new Calculator();

console.log(calculator.add("")); // Output: 0
console.log(calculator.add("1")); // Output: 1
console.log(calculator.add("1,5")); // Output: 6
console.log(calculator.add("1\n2,3")); // Output: 6
console.log(calculator.add("//;\n1;2")); // Output: 3

try {
  console.log(calculator.add("1,-2,3,-4")); // Throws error
} catch (e) {
  console.log(e.message); // Output: Negative numbers not allowed: -2, -4
}