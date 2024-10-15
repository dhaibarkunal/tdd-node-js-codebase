import { expect } from 'chai';
import Calculator from '../model/calculator.mjs';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // Test case 1: Empty string should return 0
  it('should return 0 for an empty string', () => {
    expect(calculator.add("")).to.equal(0);
  });

  // Test case 2: Single number should return that number
  it('should return the number itself if the input is a single number', () => {
    expect(calculator.add("1")).to.equal(1);
  });

  // Test case 3: Two numbers, comma-separated, should return the sum
  it('should return the sum of two comma-separated numbers', () => {
    expect(calculator.add("1,5")).to.equal(6);
  });

  // Test case 4: Handle any amount of numbers
  it('should handle multiple numbers', () => {
    expect(calculator.add("1,2,3,4")).to.equal(10);
  });

  // Test case 5: Handle new lines as delimiters
  it('should handle new lines between numbers as delimiters', () => {
    expect(calculator.add("1\n2,3")).to.equal(6);
  });

  // Test case 6: Custom delimiter, single character
  it('should support different delimiters defined in the format //delimiter\\n', () => {
    expect(calculator.add("//;\n1;2")).to.equal(3);
  });

  // Test case 7: Throw exception for negative numbers, show all negatives in the message
  it('should throw an error for negative numbers and list all negatives', () => {
    expect(() => calculator.add("1,-2,-3")).to.throw('Negative numbers not allowed: -2, -3');
  });

  // Test case 8: Ignore numbers bigger than 1000
  it('should ignore numbers bigger than 1000', () => {
    expect(calculator.add("2,1001")).to.equal(2);
  });

  // Test case 9: Handle delimiters of any length
  it('should handle delimiters of any length', () => {
    expect(calculator.add("//[***]\n1***2***3")).to.equal(6);
  });

  // Test case 10: Handle multiple delimiters
  it('should handle multiple delimiters', () => {
    expect(calculator.add("//[*][%]\n1*2%3")).to.equal(6);
  });

  // Test case 11: Handle multiple delimiters with length longer than one character
  it('should handle multiple delimiters with length longer than one character', () => {
    expect(calculator.add("//[***][%%%]\n1***2%%%3")).to.equal(6);
  });

  // Test case 12: Return 0 when all numbers are greater than 1000
  it('should return 0 if all numbers are greater than 1000', () => {
    expect(calculator.add("1001,1002")).to.equal(0);
  });

  // Test case 13: Handle single number with custom delimiter
  it('should return the number itself if there is only one number with a custom delimiter', () => {
    expect(calculator.add("//;\n5")).to.equal(5);
  });

  // Test case 14: Handle a mix of valid numbers and numbers greater than 1000
  it('should handle valid numbers and ignore numbers greater than 1000', () => {
    expect(calculator.add("2,1000,1001")).to.equal(1002);
  });

  // Test case 15: Handle a single delimiter that is a special regex character
  it('should handle a custom delimiter that is a special regex character like *', () => {
    expect(calculator.add("//[*]\n1*2*3")).to.equal(6);
  });
});
