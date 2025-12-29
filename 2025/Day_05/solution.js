const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

// Split on blank line
const [rangeBlock, idBlock] = file.split('\n\n');

// Parse ranges
const ranges = rangeBlock.split('\n').map(line => {
  const [start, end] = line.split('-').map(Number);
  return { start, end };
});

// Parse available ingredient IDs
const ids = idBlock.split('\n').map(Number);

let freshCount = 0;

for (const id of ids) {
  const isFresh = ranges.some(({ start, end }) => {
    return id >= start && id <= end;
  });

  if (isFresh) {
    freshCount++;
  }
}

console.log(freshCount);
