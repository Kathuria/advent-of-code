const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

// const sumCalibrationValues = inputs.split("\n").map(line => {
//   let [, a] = line.match(/(\d)/);
//   let [, b] = line.match(/.*(\d)/);
//   return Number(`${a}${b}`);
// })
// .reduce((acc, n) => acc + n, 0);

const NUMBERS = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
const sumCalibrationNumbers = inputs.split("\n").map(line => {
  let [, a] = line.match(`(\\d|${Object.keys(NUMBERS).join("|")})`);
  let [, b] = line.match(`.*(\\d|${Object.keys(NUMBERS).join("|")})`);
  if (a in NUMBERS) a = NUMBERS[a];
  if (b in NUMBERS) b = NUMBERS[b];
  return Number(`${a}${b}`);
})
.reduce((acc, n) => acc + n, 0);

// console.log('Part 1, What is the sum of all of the calibration values? =', sumCalibrationValues);

console.log('Part 2, What is the sum of all of the calibration values? =', sumCalibrationNumbers);