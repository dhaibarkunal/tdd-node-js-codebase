import { expect } from 'chai';
import Calculator from '../model/calculator.mjs';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should return 0 for an empty string', () => {
    expect(calculator.add("")).to.equal(0);
  });

  it('should return the number for a single number string', () => {
    expect(calculator.add("1")).to.equal(1);
  });

  it('should return the sum of two numbers', () => {
    expect(calculator.add("1,5")).to.equal(6);
  });

  it('should handle newlines as delimiters along with commas', () => {
    expect(calculator.add("1\n2,3")).to.equal(6);
  });

  it('should support different delimiters', () => {
    expect(calculator.add("//;\n1;2")).to.equal(3);
  });

  it('should throw an error when there are negative numbers', () => {
    expect(() => calculator.add("1,-2,3,-4")).to.throw('Negative numbers not allowed: -2, -4');
  });

  it('should handle multiple custom delimiters', () => {
    expect(calculator.add("//;\n1;2;3")).to.equal(6);
  });

  it('should handle large numbers', () => {
    expect(calculator.add("1000,2000,3000")).to.equal(6000);
  });

  it('should return 0 for a string with only non-numeric values', () => {
    expect(calculator.add("a,b,c")).to.equal(0);
  });

  it('should return the correct sum when custom delimiter is a special character', () => {
    expect(calculator.add("//.\n1.2.3")).to.equal(6);
  });
});
