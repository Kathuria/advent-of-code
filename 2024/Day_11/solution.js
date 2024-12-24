const fs = require('fs');

// Read input from the specified file
const filename = 'input-sample.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');

// Function to process stones based on the rules
function processStones(stones, blinks) {
    for (let i = 0; i < blinks; i++) {
        const newStones = [];
        for (const stone of stones) {
            if (stone === 0) {
                newStones.push(1);
            } else if (stone.toString().length % 2 === 0) {
                const strStone = stone.toString();
                const mid = strStone.length / 2;
                const left = parseInt(strStone.slice(0, mid), 10);
                const right = parseInt(strStone.slice(mid), 10);
                newStones.push(left, right);
            } else {
                newStones.push(stone * 2024);
            }
        }
        stones = newStones;
    }
    return stones;
}

// Parse the initial stones from the input
const initialStones = inputs[0].split(' ').map(Number);

// Define the number of blinks for Part 1 and Part 2
const blinksPart1 = 25;
const blinksPart2 = 75;

// Process the stones for Part 1
const resultStonesPart1 = processStones([...initialStones], blinksPart1);
console.log(`Number of stones after ${blinksPart1} blinks: ${resultStonesPart1.length}`);

// Process the stones for Part 2
// Due to memory issue this solution not working, tried in python also
const resultStonesPart2 = processStones([...initialStones], blinksPart2);
console.log(`Number of stones after ${blinksPart2} blinks: ${resultStonesPart2.length}`);
