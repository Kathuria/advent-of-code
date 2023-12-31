const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

let tmp = inputs.split("\n"),
    dirs = tmp.shift().split(''),
    nodes = {}, starts = [];

tmp.splice(1).forEach(line => {
    let arr = line.split(/ =|\(|\)|,/g);
    nodes[arr[0]] = {L: arr[2], R: arr[3].trim()}
    if (arr[0][2] == 'A') starts.push(arr[0]);
})

const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a / gcd(a, b) * b;
const lcmAll = arr => arr.reduce(lcm, 1);

const getSteps = current => {
    let steps = 0;
    while (current[2] !== 'Z') {
        current = nodes[current][dirs[steps % dirs.length]];
        steps++;
    }
    return steps;
}

//console.log('Part 1, How many steps are required to reach ZZZ? =', getSteps('AAA'));

console.log('Part 2, How many steps does it take before youre only on nodes that end with Z? =', lcmAll(starts.map(getSteps)));