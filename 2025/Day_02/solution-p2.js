const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

let sum = 0;

function isInvalidID(num) {
  const s = String(num);
  const n = s.length;

  for (let len = 1; len <= n / 2; len++) {
    if (n % len !== 0) continue;

    const pattern = s.slice(0, len);
    const repeats = n / len;

    if (repeats >= 2 && pattern.repeat(repeats) === s) {
      return true;
    }
  }

  return false;
}

const ranges = file.split(',');

for (const range of ranges) {
  const [start, end] = range.split('-').map(Number);

  for (let id = start; id <= end; id++) {
    if (isInvalidID(id)) {
      sum += id;
    }
  }
}

console.log(sum);
