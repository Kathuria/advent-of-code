const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

let answer = 0;
const markerSize = 14;

function allCharsUnique(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) !== i) {
      return false;
    }
  }

  return true;
}

for (let i = markerSize; i < inputs.length; i++) {
  const buffer = inputs.substring(i - markerSize, i);
  if (allCharsUnique(buffer)) {
    answer = i;
    break;
  }
}




//console.log('Part 1, How many characters need to be processed before the first start-of-packet marker is detected? =', answer);  //make markerSize as 4

console.log('Part 2, How many characters need to be processed before the first start-of-message marker is detected? =', answer);
