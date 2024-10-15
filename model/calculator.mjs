class Calculator {
  add(numbers) {
    if (!numbers) return 0;

    // Default delimiter is comma or newline
    let delimiter = /,|\n/;
    let numString = numbers;

    // Check if there is a custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterParts = numbers.match(/^\/\/(.+)\n/);
      delimiter = new RegExp(delimiterParts[1]);
      numString = numbers.split("\n").slice(1).join('\n'); // Remove the delimiter declaration
    }

    // Split the string using the delimiter(s)
    const numberList = numString.split(delimiter).map(num => parseInt(num));

    // Filter out negative numbers
    const negatives = numberList.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    // Sum the numbers, filtering out NaN values (in case of invalid inputs)
    return numberList.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  }
}

export default Calculator;

