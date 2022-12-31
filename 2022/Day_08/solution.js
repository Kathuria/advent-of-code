const fs = require('fs')

const filename = 'input.txt'
const data = fs.readFileSync(filename).toString('utf8')

const inputs = data.split("\n");

const trees = [];
for(let i = 0; i < inputs.length; i++) {
    trees[i] = inputs[i].split("").slice();
}

let maxScenicScore = 0;
let visible = 2 * inputs[0].length + 2 * (inputs.length - 2);

for(let i = 1; i < trees.length - 1; i++) {
    for(let j = 1; j < trees[0].length - 1; j++) {
        let current = trees[i][j];
        let topVisible = downVisible = leftVisible = rightVisible = true;
        let top = down = left = right = 0;
        // top
        for(let k = i - 1; k >= 0; k--) {
          top++;
            if(trees[k][j] >= current) {
                topVisible = false;
                break;
            }
        }
        // down
        for(let k = i + 1; k < trees.length; k++) {
          down++;
            if(trees[k][j] >= current) {
                downVisible = false;
                break;
            }
        }
        // left
        for(let k = j - 1; k >= 0; k--) {
          left++;
            if(trees[i][k] >= current) {
                leftVisible = false;
                break;
            }
        }
        // right
        for(let k = j + 1; k < trees[0].length; k++) {
          right++;
            if(trees[i][k] >= current) {
                rightVisible = false;
                break;
            }
        }
        if(topVisible || downVisible || leftVisible || rightVisible) {
           visible++;
        }
        maxScenicScore = Math.max(maxScenicScore, top * down * left * right);
    }
}

console.log('Part 1, How many trees are visible from outside the grid? =', visible); 

console.log('Part 2, What is the highest scenic score possible for any tree? =', maxScenicScore);
