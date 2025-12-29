const fs = require('fs');

const filename = 'input.txt';
const grid = fs.readFileSync(filename, 'utf8')
  .trimEnd()
  .split('\n')
  .map(row => row.split(''));

const rows = grid.length;
const cols = grid[0].length;

// Find S
let startCol = -1;
for (let c = 0; c < cols; c++) {
  if (grid[0][c] === 'S') {
    startCol = c;
    break;
  }
}

if (startCol === -1) {
  throw new Error('No starting position found');
}

// Queue of active beams: [row, col]
const queue = [[1, startCol]];
let splitCount = 0;

// Track which splitter cells have already split beams from a given direction
const visited = new Set();

while (queue.length > 0) {
  const [r, c] = queue.shift();

  // Beam exited the grid
  if (r >= rows || c < 0 || c >= cols) {
    continue;
  }

  const cell = grid[r][c];

  if (cell === '.') {
    // Continue downward
    queue.push([r + 1, c]);
  } else if (cell === '^') {
    const key = `${r},${c}`;
    if (!visited.has(key)) {
      visited.add(key);
      splitCount++;

      // Left beam
      queue.push([r + 1, c - 1]);
      // Right beam
      queue.push([r + 1, c + 1]);
    }
    // Original beam stops
  }
}

console.log(splitCount);
