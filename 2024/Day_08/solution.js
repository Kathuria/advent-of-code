const fs = require('fs');

// Function to read the input map from a file
function readInput(filePath) {
    return fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim());
}

// Function to find antennas on the map
function findAntennas(map) {
    const antennas = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const char = map[y][x];
            if (char !== '.') {
                antennas.push({ x, y, freq: char });
            }
        }
    }
    return antennas;
}

// Function to calculate antinodes for Part I
function calculateAntinodesPart1(antennas, mapWidth, mapHeight) {
    const antinodes = new Set();

    for (let i = 0; i < antennas.length; i++) {
        for (let j = i + 1; j < antennas.length; j++) {
            const ant1 = antennas[i];
            const ant2 = antennas[j];

            if (ant1.freq === ant2.freq) {
                const dx = ant2.x - ant1.x;
                const dy = ant2.y - ant1.y;

                const antinode1 = { x: ant1.x - dx, y: ant1.y - dy };
                const antinode2 = { x: ant2.x + dx, y: ant2.y + dy };

                if (isWithinBounds(antinode1, mapWidth, mapHeight)) {
                    antinodes.add(`${antinode1.x},${antinode1.y}`);
                }
                if (isWithinBounds(antinode2, mapWidth, mapHeight)) {
                    antinodes.add(`${antinode2.x},${antinode2.y}`);
                }
            }
        }
    }

    return antinodes.size;
}

// Function to calculate antinodes for Part II
function calculateAntinodesPart2(antennas, mapWidth, mapHeight) {
    const antinodes = new Set();

    const frequencyMap = {};
    antennas.forEach(ant => {
        if (!frequencyMap[ant.freq]) {
            frequencyMap[ant.freq] = [];
        }
        frequencyMap[ant.freq].push(ant);
    });

    for (const freq in frequencyMap) {
        const freqAntennas = frequencyMap[freq];
        const n = freqAntennas.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const ant1 = freqAntennas[i];
                const ant2 = freqAntennas[j];

                const dx = ant2.x - ant1.x;
                const dy = ant2.y - ant1.y;

                for (let k = -1; k <= 1; k += 2) {
                    const antinode = { x: ant1.x + k * dx, y: ant1.y + k * dy };
                    if (isWithinBounds(antinode, mapWidth, mapHeight)) {
                        antinodes.add(`${antinode.x},${antinode.y}`);
                    }
                }

                antinodes.add(`${ant1.x},${ant1.y}`);
                antinodes.add(`${ant2.x},${ant2.y}`);
            }
        }
    }

    return antinodes.size;
}

// Helper function to check if a point is within map bounds
function isWithinBounds(point, width, height) {
    return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
}

// Main function to solve the problem
function solveProblem(inputFilePath) {
    const map = readInput(inputFilePath);
    const antennas = findAntennas(map);
    const mapWidth = map[0].length;
    const mapHeight = map.length;

    // Solve Part I
    const uniqueAntinodeCountPart1 = calculateAntinodesPart1(antennas, mapWidth, mapHeight);
    console.log(`Part I - Number of unique antinode locations: ${uniqueAntinodeCountPart1}`);

    // Solve Part II
    const uniqueAntinodeCountPart2 = calculateAntinodesPart2(antennas, mapWidth, mapHeight);
    console.log(`Part II - Number of unique antinode locations: ${uniqueAntinodeCountPart2}`);
}

// Run the solution with the provided input file
solveProblem('input-sample.txt');
