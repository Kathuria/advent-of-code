const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

const lines = file.split('\n');

let total = 0n;

for (const line of lines) {
  const digits = line.split('').map(Number);
  let remove = digits.length - 12;

  const stack = [];

  for (const d of digits) {
    while (
      stack.length > 0 &&
      remove > 0 &&
      stack[stack.length - 1] < d
    ) {
      stack.pop();
      remove--;
    }
    stack.push(d);
  }

  // If removals remain, remove from the end
  while (remove > 0) {
    stack.pop();
    remove--;
  }

  // Take first 12 digits
  const maxNumber = BigInt(stack.slice(0, 12).join(''));
  total += maxNumber;
}

console.log(total.toString());
