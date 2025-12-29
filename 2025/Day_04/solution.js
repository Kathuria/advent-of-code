const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

const grid = file.split('\n').map(row => row.split(''));

const rows = grid.length;
const cols = grid[0].length;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];

let accessible = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] !== '@') continue;

    let neighbors = 0;

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
        neighbors++;
      }
    }

    if (neighbors < 4) {
      accessible++;
    }
  }
}

console.log(accessible);
