const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')


const instructions = inputs.split("\n").map((line) => line.split(" "));

const screenPixels = Array.from({ length: 6 }, () =>
  Array.from({ length: 40 }, () => " ")
);


let signalStrengths = 0;
let cyclesA = cyclesB=  0;
let register = 1;
for (const [command, argument] of instructions) {
  let loops = 0;
  let registerDelta = 0;
  if (command === "noop") {
    loops = 1;
  } else {
    loops = 2;
    registerDelta = Number(argument);
  }

// Part 1  
  for (let i = 0; i < loops; i++) {
    cyclesA += 1;
    if ((cyclesA - 20) % 40 === 0) {
      signalStrengths += cyclesA * register;
    }
  }

  //Part 2
  for (let i = 0; i < loops; i++) {
    const screenCol = cyclesB % 40;
    const screenRow = Math.floor((cyclesB / 40) % 6);
    // check if sprite is at currently drawn pixel
    if (screenCol >= register - 1 && screenCol <= register + 1) {
      screenPixels[screenRow][screenCol] = "#";
    }

    cyclesB += 1;
  }

  register += registerDelta;
}

const screenStr = screenPixels.map((row) => row.join("")).join("\n");

console.log('Part 1, What is the sum of these six signal strengths? =', signalStrengths); 

console.log('Part 2, What eight capital letters appear on your CRT? =', `read:\n${screenStr}`);
