const fs = require('fs');

// Function to calculate the total distance between two lists (Part 1)
function calculateTotalDistance(leftList, rightList) {
    // Sort both lists
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let totalDistance = 0;

    // Calculate the distance for each pair and sum them up
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

// Function to calculate the similarity score between two lists (Part 2)
function calculateSimilarityScore(leftList, rightList) {
    const rightListFrequency = {};

    // Count the frequency of each number in the right list
    rightList.forEach(num => {
        rightListFrequency[num] = (rightListFrequency[num] || 0) + 1;
    });

    let similarityScore = 0;

    // Calculate the similarity score based on the frequency of numbers in the right list
    leftList.forEach(num => {
        if (rightListFrequency[num]) {
            similarityScore += num * rightListFrequency[num];
        }
    });

    return similarityScore;
}

// Read input from file
const filename = 'input.txt';
const input = fs.readFileSync(filename, 'utf8');

// Parse the input into two separate lists
const lines = input.trim().split('\n');
const leftList = [];
const rightList = [];

lines.forEach(line => {
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
});

// Calculate the total distance (Part 1)
const totalDistance = calculateTotalDistance(leftList, rightList);
console.log('Total distance between the lists:', totalDistance);

// Calculate the similarity score (Part 2)
const similarityScore = calculateSimilarityScore(leftList, rightList);
console.log('Similarity score between the lists:', similarityScore);
