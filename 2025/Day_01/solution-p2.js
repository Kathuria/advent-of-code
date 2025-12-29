const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8');

let pos = 50;
let zeroCount = 0;

const lines = file.trim().split('\n');

for (const line of lines) {
  const dirChar = line[0];
  const dist = Number(line.slice(1));
  const dir = dirChar === 'R' ? 1 : -1;

  // find first step where dial hits 0
  let first =
    dir === 1
      ? (100 - pos) % 100
      : pos % 100;

  if (first === 0) first = 100;

  if (first <= dist) {
    zeroCount += 1 + Math.floor((dist - first) / 100);
  }

  // update final position
  pos = ((pos + dir * dist) % 100 + 100) % 100;
}

console.log(zeroCount);
