const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

// == SHARED ==

function parseInput(input) {
  return input
    .split("\n")
    .map(line => {
      let [, id, cubes] = line.match(/^Game (\d+): (.*)$/);
      return {
        id: Number(id),
        cubes: [...cubes.matchAll(/(\d+) (\w+)/g)].map(([, count, color]) => ({count: Number(count), color})),
      };
    });
}

// == PART 1 ==

function part1(input) {
  let MAX_CUBES = {red: 12, green: 13, blue: 14};

  return parseInput(input)
    .filter(({cubes}) => cubes.every(({count, color}) => count <= MAX_CUBES[color]))
    .reduce((sum, {id}) => sum + id, 0);
}

// == PART 2 ==

function part2(input) {
  return parseInput(input)
    .map(({cubes}) => cubes.reduce((maxCounts, {count, color}) => ({...maxCounts, [color]: Math.max(maxCounts[color], count)}), {red: 0, green: 0, blue: 0}))
    .map(({red, green, blue}) => red * green * blue)
    .reduce((sum, power) => sum + power, 0);
}

console.log('Part 1, What is the sum of the IDs of those games? =', part1(inputs));

console.log('Part 2, What is the sum of the power of these sets? =', part2(inputs));