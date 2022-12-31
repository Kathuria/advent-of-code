const fs = require('fs')

const filename = 'input.txt'
const data = fs.readFileSync(filename).toString('utf8')

const inputs = data.split("\n");

const cubes = new Set(inputs);

const next = [[0,0,1], [0,0,-1], [0,1,0], [0,-1,0], [1,0,0], [-1,0,0]];
let area = 0;

for(const cube of cubes) {
    let cubeArea = 6;
    const pos = cube.split(",").map(e => +e);
    for(const n of next) {
        if(cubes.has(`${pos[0] + n[0]},${pos[1] + n[1]},${pos[2] + n[2]}`)) {
            cubeArea--;
        }
    }
    area += cubeArea;
}


console.log('Part 1, What is the surface area of your scanned lava droplet? =', area); 


console.log('Part 2, What is the exterior surface area of your scanned lava droplet?  =', );
