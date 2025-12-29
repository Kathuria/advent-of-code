const fs = require('fs');

const filename = 'input.txt';
const lines = fs.readFileSync(filename, 'utf8').split('\n');

// Normalize width
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

  // Find end of this problem block
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

  // Extract problem
  const numbers = [];
  let operator = null;

  for (let r = 0; r < height; r++) {
    const text = grid[r]
      .slice(startCol, endCol)
      .join('')
      .trim();

    if (!text) continue;

    if (r === height - 1) {
      operator = text;
    } else {
      numbers.push(Number(text));
    }
  }

  // Evaluate problem
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
