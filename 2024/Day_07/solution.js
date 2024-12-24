const fs = require('fs');

// Function to evaluate an expression left-to-right, including concatenation
function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '||') {
            result = parseInt('' + result + numbers[i + 1], 10);
        }
    }
    return result;
}

// Function to generate all combinations of operators
function generateOperatorCombinations(length) {
    const results = [];
    const operators = ['+', '*', '||'];

    function backtrack(current, depth) {
        if (depth === length) {
            results.push([...current]);
            return;
        }
        for (let op of operators) {
            current.push(op);
            backtrack(current, depth + 1);
            current.pop();
        }
    }

    backtrack([], 0);
    return results;
}

// Main function to solve the problem
function solve(filename) {
    const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');
    let totalCalibrationResultPart1 = 0;
    let totalCalibrationResultPart2 = 0;

    for (let line of inputs) {
        const parts = line.split(': ');
        if (parts.length !== 2) {
            console.error(`Invalid input format for line: ${line}`);
            continue;
        }

        const testValue = parseInt(parts[0], 10);
        const numbers = parts[1].split(' ').map(Number);

        const operatorCombinations = generateOperatorCombinations(numbers.length - 1);
        let isValidPart1 = false;
        let isValidPart2 = false;

        for (let operators of operatorCombinations) {
            const result = evaluateExpression(numbers, operators);
            if (result === testValue) {
                isValidPart2 = true;
                if (!operators.includes('||')) {
                    isValidPart1 = true;
                }
            }
        }

        if (isValidPart1) {
            totalCalibrationResultPart1 += testValue;
        }
        if (isValidPart2) {
            totalCalibrationResultPart2 += testValue;
        }
    }

    console.log(`Total Calibration Result Part 1: ${totalCalibrationResultPart1}`);
    console.log(`Total Calibration Result Part 2: ${totalCalibrationResultPart2}`);
}

// Run the solution with the sample input file
solve('input.txt');
