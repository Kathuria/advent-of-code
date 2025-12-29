const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

let sum = 0;

// Check if a number is an invalid ID
function isInvalidID(num) {
  const s = String(num);
  if (s.length % 2 !== 0) return false;

  const half = s.length / 2;
  return s.slice(0, half) === s.slice(half);
}

// Parse ranges
const ranges = file.split(',');

for (const range of ranges) {
  const [start, end] = range.split('-').map(Number);

  for (let i = start; i <= end; i++) {
    if (isInvalidID(i)) {
      sum += i;
    }
  }
}

console.log(sum);
