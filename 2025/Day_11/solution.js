const fs = require('fs');

const filename = 'input.txt';
const file = fs.readFileSync(filename, 'utf8').trim();

// Build adjacency list
const graph = new Map();

for (const line of file.split('\n')) {
  const [node, rest] = line.split(': ');
  const neighbors = rest ? rest.split(' ') : [];
  graph.set(node, neighbors);
}

// Memoization map: node -> number of paths to 'out'
const memo = new Map();

function countPaths(node) {
  if (node === 'out') {
    return 1;
  }

  if (memo.has(node)) {
    return memo.get(node);
  }

  let total = 0;
  const neighbors = graph.get(node) || [];

  for (const next of neighbors) {
    total += countPaths(next);
  }

  memo.set(node, total);
  return total;
}

const result = countPaths('you');
console.log(result);
