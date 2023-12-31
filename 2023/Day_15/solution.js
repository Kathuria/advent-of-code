const fs = require('fs')

const filename = 'input-sample.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

// == SHARED ==

function holidayAsciiStringHelper(string) {
    let currentValue = 0;
  
    for (let char of string) {
      currentValue += char.codePointAt(0);
      currentValue *= 17;
      currentValue %= 256;
    }
  
    return currentValue;
  }

// == PART 1 ==

function part1(input) {
    return input
      .split(",")
      .map(holidayAsciiStringHelper)
      .reduce((sum, n) => sum + n, 0);
  }
  
  // == PART 2 ==
  
  function part2(input) {
    let initializationSequence = input
      .split(",")
      .map(line => {
        let [, label, operation, focalLength] = line.match(/^(\w+)([-=])(\d+)?$/);
        focalLength = Number(focalLength);
        return {label, operation, focalLength};
      });
  
    let boxes = Array(256).fill().map(() => ({}));
  
    for (let {label, operation, focalLength} of initializationSequence) {
      let box = holidayAsciiStringHelper(label);
      if (operation === "-") {
        delete boxes[box][label];
      } else {
        boxes[box][label] = focalLength;
      }
    }
  
    return boxes
      .flatMap((box, boxNumber) => Object.values(box).map((focalLength, slotNumber) => (boxNumber + 1) * (slotNumber + 1) * focalLength))
      .reduce((sum, n) => sum + n, 0);
  }

  
console.log('Part 1, What is the sum of the results? =', part1(inputs));

console.log('Part 2, What is the focusing power of the resulting lens configuration? =', part2(inputs));