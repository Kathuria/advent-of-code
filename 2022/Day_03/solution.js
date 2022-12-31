const fs = require('fs')

const filename = 'input.txt'
const rucksacks = fs.readFileSync(filename).toString('utf8')

function getCharPriority(item) {
  const itemCharLocation = item.charCodeAt(0);    // for adding priorties
  return item === item.toUpperCase()
    ? itemCharLocation - 65 + 27
    : itemCharLocation - 97 + 1
}

const answer1 = rucksacks
  .split("\n")
  .map((line) => {
    const half = line.length / 2;   // splitting the value
    return [
      line.substring(0, half),
      line.substring(half, line.length),
    ]
  })
  .map(
    ([compartmentA, compartmentB]) =>
      [...compartmentA].filter((item) => compartmentB.includes(item))[0]
  )
  .map((item) => getCharPriority(item)
  )
  .reduce((acc, priority) => acc + priority, 0);

console.log('Part 1, Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types? =', answer1);


const answer2 = rucksacks
  .match(/\w+\n\w+\n\w+/g)
  .map((group) => group.match(/(?<item>\w).*\n.*\k<item>.*\n.*\k<item>/)) // matches a character appearing in all three lines
  .map((match) => match.groups["item"])
  .map((item) => getCharPriority(item))
  .reduce((acc, priority) => acc + priority, 0);

console.log('Part 2, Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types? =', answer2);