const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

let answer1 = 0, answer2 = 0;
const assignementPairs = inputs.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g);
for (const [, fromA, toA, fromB, toB] of assignementPairs) {
  // Part 1 soln
  if (+fromA <= +fromB && +toA >= +toB) {
    answer1 += 1; // a contains b
  } else if (+fromB <= +fromA && +toB >= +toA) {
    answer1 += 1; // b contains a
  }

  //Part 2 soln
  if (+fromA <= +toB && +fromB <= +toA) {
    answer2 += 1;
  }
}

console.log('Part 1, In how many assignment pairs does one range fully contain the other? =', answer1);

console.log('Part 2, In how many assignment pairs do the ranges overlap? =', answer2);
