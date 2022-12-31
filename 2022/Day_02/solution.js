const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

const answer1 = inputs
  .split("\n")
  .map((line) => {
    switch (line) {
      case "A X": // rock/rock
        return 1 + 3;
      case "A Y": // rock/paper
        return 2 + 6;
      case "A Z": // rock/scissor
        return 3 + 0;
      case "B X": // paper/rock
        return 1 + 0;
      case "B Y": // paper/paper
        return 2 + 3;
      case "B Z": // paper/scissor
        return 3 + 6;
      case "C X": // scissor/rock
        return 1 + 6;
      case "C Y": // scissor/paper
        return 2 + 0;
      case "C Z": // scissor/scissor
        return 3 + 3;
    }
  })
  .reduce((acc, score) => acc + score, 0);

console.log('Part 1, What would your total score be if everything goes exactly according to your strategy guide? =', answer1);

const answer2 = inputs
  .split("\n")
  .map((line) => {
    switch (line) {
      case "A X": // rock/lose => scissor
        return 3 + 0;
      case "A Y": // rock/draw => rock
        return 1 + 3;
      case "A Z": // rock/win => paper
        return 2 + 6;
      case "B X": // paper/lose => rock
        return 1 + 0;
      case "B Y": // paper/draw => paper
        return 2 + 3;
      case "B Z": // paper/win => scissor
        return 3 + 6;
      case "C X": // scissor/lose => paper
        return 2 + 0;
      case "C Y": // scissor/draw => scissor
        return 3 + 3;
      case "C Z": // scissor/win => rock
        return 1 + 6;
    }
  })
  .reduce((acc, score) => acc + score, 0);

console.log('Part 2, What would your total score be if everything goes exactly according to your strategy guide? =', answer2);