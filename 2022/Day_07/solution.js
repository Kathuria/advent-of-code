const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')


const commandRegex = /\$ (?<command>cd|ls) ?(?<argument>(\w+|\/|\.\.)+)?/;
const fileSystem = { "/": {} };
let currentDir = fileSystem["/"];
let pathSegments = [];
for (const line of inputs.split("\n")) {
  const commandMatch = line.match(commandRegex);
  if (commandMatch) {
    if (commandMatch.groups["command"] === "cd") {
      if (commandMatch.groups["argument"] === "/") {
        pathSegments = [];
        currentDir = fileSystem["/"];
      } else if (commandMatch.groups["argument"] === "..") {
        pathSegments.pop();
        currentDir = getDirectoryFromPath(fileSystem, pathSegments);
      } else {
        pathSegments.push(commandMatch.groups["argument"]);
        currentDir = addDirectory(currentDir, commandMatch.groups["argument"]);
      }
    }
  } else {
    // parse ls output
    const [first, second] = line.split(" ");
    if (first === "dir") {
      addDirectory(currentDir, second);
    } else {
      currentDir[second] = Number(first);
    }
  }
}

let answer = 0;
getSumOfDirectories(fileSystem["/"]);

function addDirectory(currentDir, newDir) {
  if (!currentDir[newDir]) {
    currentDir[newDir] = {};
  }

  return currentDir[newDir];
}

function getDirectoryFromPath(fileSystem, pathSegments) {
  let dir = fileSystem["/"];
  for (const segment of pathSegments) {
    dir = dir[segment];
  }

  return dir;
}

function getSumOfDirectories(directory) {
  let size = 0;
  for (const [key, value] of Object.entries(directory)) {
    if (Number.isInteger(value)) {
      size += value;
    } else {
      size += getSumOfDirectories(directory[key]);
    }
  }

  if (size < 100000) {
    answer += size;
  }

  return size;
}

console.log('Part 1,What is the sum of the total sizes of those directories? =', answer); 


const sizes = [];
const total = getSizes(fileSystem["/"], sizes);
const unused = 70000000 - total;
const minDirSize = 30000000 - unused;

function getSizes(directory, sizes) {
  let size = 0;
  for (const [key, value] of Object.entries(directory)) {
    if (Number.isInteger(value)) {
      size += value;
    } else {
      size += getSizes(directory[key], sizes);
    }
  }

  sizes.push(size);
  return size;
}


console.log('Part 2, What is the total size of that directory? =', Math.min(...sizes.filter((s) => s > minDirSize)));
