const fs = require('fs');

// Function to compact the disk and calculate the checksum
function compactDiskAndCalculateChecksum(diskMap) {
    let blocks = [];
    let fileId = 0;

    // Parse the disk map into blocks
    for (let i = 0; i < diskMap.length; i += 2) {
        const fileSize = parseInt(diskMap[i], 10);
        const freeSpaceSize = parseInt(diskMap[i + 1], 10);

        // Add file blocks
        for (let j = 0; j < fileSize; j++) {
            blocks.push(fileId);
        }

        // Add free space blocks
        for (let j = 0; j < freeSpaceSize; j++) {
            blocks.push('.');
        }

        if (fileSize > 0) {
            fileId++;
        }
    }

    // Compact the disk
    let compactedBlocks = [];
    for (let block of blocks) {
        if (block !== '.') {
            compactedBlocks.push(block);
        }
    }
    while (compactedBlocks.length < blocks.length) {
        compactedBlocks.push('.');
    }

    // Calculate the checksum
    let checksum = 0;
    for (let i = 0; i < compactedBlocks.length; i++) {
        if (compactedBlocks[i] !== '.') {
            checksum += i * compactedBlocks[i];
        }
    }

    return checksum;
}

// Read input from the specified file
const filename = 'input-sample.txt';
const diskMap = fs.readFileSync(filename, 'utf8').trim();

// Calculate the checksum
const checksum = compactDiskAndCalculateChecksum(diskMap);
console.log(`The resulting filesystem checksum is: ${checksum}`);
