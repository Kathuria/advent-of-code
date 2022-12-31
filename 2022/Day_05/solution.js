const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

const [stackInput, instructionInput] = inputs.split("\n\n");

// parse stack drawing
const stacks = Array.from({ length: 9 }, () => []);
stackInput
  .split("\n")
  .slice(0, -1) // skip stack label line (last line)
  .forEach((line) => {
    // take every 4th character, starting at 1
    for (let i = 1; i < line.length; i += 4) {
      // whitespace figures empty space for given stack in the stack layer
      if (line[i] !== " ") {
        stacks[(i - 1) / 4].unshift(line[i]);
      }
    }
  });

// parse and apply instructions
for (const instruction of instructionInput.split("\n")) {
  const match = instruction.match(/move (\d+) from (\d+) to (\d+)/);
  const move = Number(match[1]);
  const from = Number(match[2]) - 1; // adjust for array index
  const to = Number(match[3]) - 1; // adjust for array index

  /* For part 1
   for (let n = 0; n < move; n++) {
     stacks[to].push(stacks[from].pop());
   }
   */


  // For part 2
  const remaining = stacks[from].length - move;

  
  stacks[to].push(...stacks[from].slice(remaining));
  stacks[from] = stacks[from].slice(0, remaining);
}


const answer = stacks.map((s) => s[s.length -1]).join("");

//console.log('Part 1, In how many assignment pairs does one range fully contain the other? =', answer);

console.log('Part 2, After the rearrangement procedure completes, what crate ends up on top of each stack? =', answer);
