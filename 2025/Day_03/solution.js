const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

const lines = file.split('\n');

let total = 0;

for (const line of lines) {
  let maxJoltage = 0;

  for (let i = 0; i < line.length - 1; i++) {
    const first = Number(line[i]);

    // find the maximum digit to the right
    let maxSecond = 0;
    for (let j = i + 1; j < line.length; j++) {
      const digit = Number(line[j]);
      if (digit > maxSecond) {
        maxSecond = digit;
      }
    }

    const value = first * 10 + maxSecond;
    if (value > maxJoltage) {
      maxJoltage = value;
    }
  }

  total += maxJoltage;
}

console.log(total);
