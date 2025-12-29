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

// Memoization: "node|seenDac|seenFft" -> count
const memo = new Map();

function countPaths(node, seenDac, seenFft) {
  // Update flags if current node is dac or fft
  const hasDac = seenDac || node === 'dac';
  const hasFft = seenFft || node === 'fft';

  if (node === 'out') {
    return hasDac && hasFft ? 1 : 0;
  }

  const key = `${node}|${hasDac}|${hasFft}`;
  if (memo.has(key)) {
    return memo.get(key);
  }

  let total = 0;
  const neighbors = graph.get(node) || [];

  for (const next of neighbors) {
    total += countPaths(next, hasDac, hasFft);
  }

  memo.set(key, total);
  return total;
}

const result = countPaths('svr', false, false);
console.log(result);
