const fs = require('fs');

const filename = 'input.txt';
const lines = fs.readFileSync(filename, 'utf8').split('\n');

// Normalize grid width
const width = Math.max(...lines.map(l => l.length));
const grid = lines.map(l => l.padEnd(width, ' ').split(''));

const height = grid.length;
let col = 0;
let total = 0;

while (col < width) {
  // Skip empty columns
  let hasData = false;
  for (let r = 0; r < height; r++) {
    if (grid[r][col] !== ' ') {
      hasData = true;
      break;
    }
  }
  if (!hasData) {
    col++;
    continue;
  }

  // Find block bounds
  let startCol = col;
  let endCol = col;

  while (endCol < width) {
    let columnHasData = false;
    for (let r = 0; r < height; r++) {
      if (grid[r][endCol] !== ' ') {
        columnHasData = true;
        break;
      }
    }
    if (!columnHasData) break;
    endCol++;
  }

  // Operator is at bottom row
  const operator = grid[height - 1]
    .slice(startCol, endCol)
    .join('')
    .trim();

  // Extract numbers (right-to-left columns)
  const numbers = [];

  for (let c = endCol - 1; c >= startCol; c--) {
    let digits = '';

    for (let r = 0; r < height - 1; r++) {
      const ch = grid[r][c];
      if (ch >= '0' && ch <= '9') {
        digits += ch;
      }
    }

    if (digits.length > 0) {
      numbers.push(Number(digits));
    }
  }

  // Evaluate
  let value;
  if (operator === '+') {
    value = numbers.reduce((a, b) => a + b, 0);
  } else if (operator === '*') {
    value = numbers.reduce((a, b) => a * b, 1);
  } else {
    throw new Error('Unknown operator: ' + operator);
  }

  total += value;
  col = endCol;
}

console.log(total);
