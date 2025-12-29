const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

let grid = file.split('\n').map(row => row.split(''));

const rows = grid.length;
const cols = grid[0].length;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];

function countNeighbors(r, c) {
  let count = 0;
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (
      nr >= 0 &&
      nr < rows &&
      nc >= 0 &&
      nc < cols &&
      grid[nr][nc] === '@'
    ) {
      count++;
    }
  }
  return count;
}

let totalRemoved = 0;

while (true) {
  const toRemove = [];

  // find all accessible rolls
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '@' && countNeighbors(r, c) < 4) {
        toRemove.push([r, c]);
      }
    }
  }

  // stop if none can be removed
  if (toRemove.length === 0) break;

  // remove all at once
  for (const [r, c] of toRemove) {
    grid[r][c] = '.';
  }

  totalRemoved += toRemove.length;
}

console.log(totalRemoved);
