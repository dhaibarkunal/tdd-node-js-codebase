class Calculator {
  add(numbers) {
    if (!numbers) return 0;

    let delimiter = /,|\n/;
    let numString = numbers;

    // Handle custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterParts = numbers.match(/^\/\/(\[.*\])\n|^\/\/(.+)\n/);

      if (delimiterParts[1]) {
        delimiter = new RegExp(
          delimiterParts[1]
            .replace(/^\[|\]$/g, "") // Remove leading/trailing square brackets
            .split("][")
            .map((d) => d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")) // Escape regex special characters
            .join("|")
        );
      } else {
        // Single custom delimiter
        delimiter = new RegExp(delimiterParts[2]);
      }

      numString = numbers.split("\n").slice(1).join("\n");
    }

    const numberList = numString
      .split(delimiter)
      .map((num) => parseInt(num))
      .filter((num) => num <= 1000); // Ignore numbers greater than 1000

    const negatives = numberList.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return numberList.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  }
}

export default Calculator;

