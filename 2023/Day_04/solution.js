const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

// == SHARED ==

function parseInput(line) {
  let [wins, nums] = line.split(':')[1].split('|');
    wins = wins.match(/\d+/g).map(Number);
    nums = nums.match(/\d+/g).map(Number);
    
  return nums.filter((n) => wins.includes(n)).length;
}

// == PART 1 ==

function part1(input) {
  let score = 0;
  for (const line of input.split('\n')) {
    const nWins = parseInput(line);
    score += nWins && 2 ** (nWins - 1); //Exponential of 2 for wins 1+
  }
  return score;
}

// == PART 2 ==

function part2(input) {
  const lines = input.split('\n');
  const nCards = lines.map(() => 1);
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < parseInput(lines[i]); j++) {
      nCards[i + 1 + j] += nCards[i];
    }
  }
  return nCards.reduce((acc, n) => acc + n);
}

console.log('Part 1, How many points are they worth in total? =', part1(inputs));

console.log('Part 2, How many total scratchcards do you end up with? =', part2(inputs));