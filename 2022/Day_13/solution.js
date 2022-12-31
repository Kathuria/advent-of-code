const fs = require('fs')

const filename = 'input.txt'
const data = fs.readFileSync(filename).toString('utf8')

const inputs = data.split("\n");

function compare(a, b) {
    let i = 0;
    while(i < Math.min(a.length, b.length)) {
        if(Number.isInteger(a[i]) && Number.isInteger(b[i])) {
            if(a[i] === b[i]) {
                i++;
            }
            else {
                return a[i] - b[i];
            }
        }
        else {
            let an = Number.isInteger(a[i]) ? [a[i]] : a[i].slice();
            let bn = Number.isInteger(b[i]) ? [b[i]] : b[i].slice();
            const cmpNext = compare(an, bn);
            if(cmpNext === 0) {
                i++;
            }
            else {
                return cmpNext;
            }
        }
    }
    return a.length - b.length;
}

let sum = 0;

for(let i = 0; i < inputs.length; i += 3) {
    if(compare(eval(inputs[i]), eval(inputs[i + 1])) < 0) {
        sum += i / 3 + 1;
    }
}

console.log('Part 1, What is the sum of the indices of those pairs? =', sum); 

let packets = [];

for(let i = 0; i < inputs.length; i++) {
    if(inputs[i] !== "") {
        packets.push(eval(inputs[i]));
    }
}
packets.push([[2]], [[6]]);

packets.sort((a, b) => compare(a, b));

const idx1 = packets.findIndex(p => p.toString() === "2") + 1;
const idx2 = packets.findIndex(p => p.toString() === "6") + 1;

console.log('Part 2, What is the decoder key for the distress signal? =', idx1 * idx2);
