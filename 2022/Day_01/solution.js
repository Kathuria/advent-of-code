const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

const sumPerElf = inputs.split("\n\n").map((group) =>
  group
    .split("\n")
    .map((line) => Number(line))
    .reduce((acc, calories) => acc + calories, 0)
).sort((a, b) => b - a);

console.log('Part 1, How many total Calories is that Elf carrying? =', Math.max(...sumPerElf));

console.log('Part 2, How many Calories are those Elves carrying in total? =', sumPerElf[0] + sumPerElf[1] + sumPerElf[2]);