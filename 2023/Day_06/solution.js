const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

// == PART 1 ==

function part1(input) {
  let [times, recordDistances] = input
    .split("\n")
    .map(line => [...line.matchAll(/\d+/g)].map(Number));

  return times.reduce((product, time, i) => {
    let recordDistance = recordDistances[i];

    let recordBeaten = 0;
    for (let hold = 1; hold < time; hold++) {
      if (hold * (time - hold) > recordDistance) {
        recordBeaten++;
      }
    }

    return product * recordBeaten;
  }, 1);
}

// == PART 2 ==

function part2(input) {
  return part1(input.replaceAll(" ", ""));
}

console.log('Part 1, What do you get if you multiply these numbers together? =', part1(inputs));

console.log('Part 2, How many ways can you beat the record in this one much longer race? =', part2(inputs));