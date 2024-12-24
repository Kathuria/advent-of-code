const fs = require('fs');

// Read input from the specified file
const filename = 'input-sample.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');

// Direction vectors for up, right, down, left
const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 1, dy: 0 },  // Right
    { dx: 0, dy: 1 },  // Down
    { dx: -1, dy: 0 }  // Left
];

// Find initial position and direction
let startX, startY, startDir;
for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
        if ('^>v<'.includes(inputs[y][x])) {
            startX = x;
            startY = y;
            startDir = '^>v<'.indexOf(inputs[y][x]);
            break;
        }
    }
}

// Set to track visited positions
const visited = new Set();
let x = startX, y = startY, dir = startDir;

// Helper function to check if position is within bounds
const isWithinBounds = (x, y) => x >= 0 && x < inputs[0].length && y >= 0 && y < inputs.length;

// Simulate guard movement
while (isWithinBounds(x, y)) {
    // Mark current position as visited
    visited.add(`${x},${y}`);

    // Calculate next position
    const nextX = x + directions[dir].dx;
    const nextY = y + directions[dir].dy;

    // Check if next position is an obstacle or out of bounds
    if (!isWithinBounds(nextX, nextY) || inputs[nextY][nextX] === '#') {
        // Turn right
        dir = (dir + 1) % 4;
    } else {
        // Move forward
        x = nextX;
        y = nextY;
    }
}

// Output the number of distinct positions visited
console.log(visited.size);
