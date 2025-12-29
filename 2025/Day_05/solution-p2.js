const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

// Only need the first block (ranges)
const rangeBlock = file.split('\n\n')[0];

// Parse ranges
const ranges = rangeBlock.split('\n').map(line => {
  const [start, end] = line.split('-').map(Number);
  return { start, end };
});

// Sort ranges by starting ID
ranges.sort((a, b) => a.start - b.start);

// Merge ranges and count total fresh IDs
let totalFresh = 0;

let currentStart = ranges[0].start;
let currentEnd = ranges[0].end;

for (let i = 1; i < ranges.length; i++) {
  const { start, end } = ranges[i];

  if (start <= currentEnd + 1) {
    // Overlapping or adjacent → extend range
    currentEnd = Math.max(currentEnd, end);
  } else {
    // Disjoint → close previous range
    totalFresh += currentEnd - currentStart + 1;
    currentStart = start;
    currentEnd = end;
  }
}

// Add final range
totalFresh += currentEnd - currentStart + 1;

console.log(totalFresh);
