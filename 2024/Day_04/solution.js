const fs = require('fs');

// Function to check if the word "XMAS" is found starting from (row, col) in a given direction
function checkDirection(grid, row, col, direction) {
    const word = "XMAS";
    const directions = {
        right: [0, 1],
        down: [1, 0],
        downRight: [1, 1],
        downLeft: [1, -1],
        left: [0, -1],
        up: [-1, 0],
        upRight: [-1, 1],
        upLeft: [-1, -1]
    };

    let [dRow, dCol] = directions[direction];
    for (let i = 0; i < word.length; i++) {
        let newRow = row + i * dRow;
        let newCol = col + i * dCol;
        if (
            newRow < 0 || newRow >= grid.length ||
            newCol < 0 || newCol >= grid[0].length ||
            grid[newRow][newCol] !== word[i]
        ) {
            return false;
        }
    }
    return true;
}

// Function to count all occurrences of "XMAS" in the grid
function countXMASOccurrences(grid) {
    const directions = ["right", "down", "downRight", "downLeft", "left", "up", "upRight", "upLeft"];
    let count = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            for (let direction of directions) {
                if (checkDirection(grid, row, col, direction)) {
                    count++;
                }
            }
        }
    }
    return count;
}

// Read input from the specified file
const filename = 'input-sample.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim();
const grid = inputs.split('\n').map(line => line.split(''));

// Count and print the occurrences of "XMAS"
const occurrences = countXMASOccurrences(grid);
console.log(`The word "XMAS" appears ${occurrences} times.`);
