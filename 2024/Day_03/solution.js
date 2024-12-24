const fs = require('fs');

// Function to extract and process valid mul instructions
function processInstructions(input) {
    // Regular expression to match valid mul instructions
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    let match;
    let sum = 0;

    // Iterate over all matches in the input
    while ((match = mulRegex.exec(input)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

// Read input from the specified file
const filename = 'input-sample.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim();

// Calculate the sum of all valid mul instruction results
const result = processInstructions(inputs);
console.log(`The sum of all valid mul instruction results is: ${result}`);
