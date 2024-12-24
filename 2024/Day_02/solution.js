const fs = require('fs');

// Read input from the specified file
const filename = 'input.txt';
const inputs = fs.readFileSync(filename, 'utf8').trim().split('\n');

/**
 * Checks if a report is safe according to Part I criteria.
 * A report is safe if levels are either all increasing or all decreasing,
 * and any two adjacent levels differ by at least one and at most three.
 */
function isSafeReport(levels) {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < levels.length - 1; i++) {
        const diff = levels[i + 1] - levels[i];

        // Check if the difference is within the allowed range
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        // Determine if the sequence is strictly increasing or decreasing
        if (diff > 0) {
            decreasing = false;
        } else if (diff < 0) {
            increasing = false;
        }
    }

    // A report is safe if it is either strictly increasing or strictly decreasing
    return increasing || decreasing;
}

/**
 * Checks if a report can be made safe by removing one level.
 */
function canBeMadeSafeByRemovingOneLevel(levels) {
    for (let i = 0; i < levels.length; i++) {
        // Create a new array with one level removed
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeReport(modifiedLevels)) {
            return true;
        }
    }
    return false;
}

/**
 * Counts the number of safe reports for Part I.
 */
function countSafeReports(reports) {
    let safeCount = 0;

    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(levels)) {
            safeCount++;
        }
    }

    return safeCount;
}

/**
 * Counts the number of safe reports, considering the Problem Dampener for Part II.
 */
function countSafeReportsWithDampener(reports) {
    let safeCount = 0;

    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(levels) || canBeMadeSafeByRemovingOneLevel(levels)) {
            safeCount++;
        }
    }

    return safeCount;
}

// Count and display the number of safe reports for Part I
const safeReportsCountPart1 = countSafeReports(inputs);
console.log(`Number of safe reports (Part I): ${safeReportsCountPart1}`);

// Count and display the number of safe reports considering the Problem Dampener for Part II
const safeReportsCountPart2 = countSafeReportsWithDampener(inputs);
console.log(`Number of safe reports considering the Problem Dampener (Part II): ${safeReportsCountPart2}`);
