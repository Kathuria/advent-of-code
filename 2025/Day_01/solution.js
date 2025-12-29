const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8');

let position = 50;
let zeroCount = 0;

// split by lines, ignore empty ones
const lines = file.trim().split('\n');

for (const line of lines) {
  const direction = line[0];
  const distance = Number(line.slice(1));

  if (direction === 'L') {
    position -= distance;
  } else if (direction === 'R') {
    position += distance;
  }

  // keep position in range 0–99
  position = ((position % 100) + 100) % 100;

  if (position === 0) {
    zeroCount++;
  }
}

console.log(zeroCount);
