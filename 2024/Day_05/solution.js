const fs = require('fs');

// Read input from the specified file
const filename = 'input.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');

// Separate ordering rules and updates
const rules = [];
const updates = [];
let readingRules = true;

for (const line of inputs) {
  if (line.includes('|')) {
    rules.push(line.split('|').map(Number));
  } else if (line.includes(',')) {
    updates.push(line.split(',').map(Number));
  }
}

// Function to check if an update is correctly ordered
function isCorrectlyOrdered(update, rules) {
  const position = new Map();
  update.forEach((page, index) => position.set(page, index));

  for (const [x, y] of rules) {
    if (position.has(x) && position.has(y)) {
      if (position.get(x) >= position.get(y)) {
        return false;
      }
    }
  }
  return true;
}

// Function to reorder an update according to the rules
function reorderUpdate(update, rules) {
  const graph = new Map();
  const inDegree = new Map();

  // Initialize graph and in-degree map
  update.forEach(page => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  // Build graph based on rules
  for (const [x, y] of rules) {
    if (graph.has(x) && graph.has(y)) {
      graph.get(x).push(y);
      inDegree.set(y, inDegree.get(y) + 1);
    }
  }

  // Topological sort using Kahn's algorithm
  const queue = [];
  inDegree.forEach((degree, node) => {
    if (degree === 0) queue.push(node);
  });

  const sorted = [];
  while (queue.length > 0) {
    const node = queue.shift();
    sorted.push(node);
    for (const neighbor of graph.get(node)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sorted;
}

// Calculate the sum of middle page numbers of correctly ordered updates
let sumOfMiddlePagesCorrect = 0;
let sumOfMiddlePagesReordered = 0;

for (const update of updates) {
  if (isCorrectlyOrdered(update, rules)) {
    const middleIndex = Math.floor(update.length / 2);
    sumOfMiddlePagesCorrect += update[middleIndex];
  } else {
    const reordered = reorderUpdate(update, rules);
    const middleIndex = Math.floor(reordered.length / 2);
    sumOfMiddlePagesReordered += reordered[middleIndex];
  }
}

console.log(`Sum of middle page numbers for correctly ordered updates: ${sumOfMiddlePagesCorrect}`);
console.log(`Sum of middle page numbers for reordered updates: ${sumOfMiddlePagesReordered}`);
