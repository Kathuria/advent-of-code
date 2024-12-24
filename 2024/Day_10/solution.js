const fs = require('fs');

// Read input from the specified file
const filename = 'input.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');

// Convert the input into a 2D array of integers
const map = inputs.map(line => line.split('').map(Number));

// Directions for moving up, down, left, right
const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1]   // right
];

// Function to check if a position is within the bounds of the map
function isValid(x, y, map) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}

// Function to find all reachable 9s from a given trailhead
function findReachableNines(map, startX, startY) {
    const queue = [[startX, startY]];
    const visited = new Set();
    const reachableNines = new Set();

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        const key = `${x},${y}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (map[x][y] === 9) {
            reachableNines.add(key);
            continue;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValid(newX, newY, map) && map[newX][newY] === map[x][y] + 1) {
                queue.push([newX, newY]);
            }
        }
    }

    return reachableNines.size;
}

// Main function to calculate the sum of scores of all trailheads for Part I
function calculateTrailheadScoresPart1(map) {
    let totalScore = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                totalScore += findReachableNines(map, i, j);
            }
        }
    }

    return totalScore;
}

// Function to implement Part II of the problem
function calculateTrailheadScoresPart2(map) {
    let totalPaths = 0;

    function explorePaths(x, y, currentHeight) {
        if (!isValid(x, y, map) || map[x][y] !== currentHeight) return 0;
        if (map[x][y] === 9) return 1;

        let pathCount = 0;
        for (const [dx, dy] of directions) {
            pathCount += explorePaths(x + dx, y + dy, currentHeight + 1);
        }
        return pathCount;
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                totalPaths += explorePaths(i, j, 0);
            }
        }
    }

    return totalPaths;
}

// Calculate and print the total score for Part I
const totalScorePart1 = calculateTrailheadScoresPart1(map);
console.log(`The sum of the scores of all trailheads for Part I is: ${totalScorePart1}`);

// Calculate and print the result for Part II
const resultPart2 = calculateTrailheadScoresPart2(map);
console.log(`The result for Part II is: ${resultPart2}`);
