const fs = require('fs')

const filename = 'input.txt'
const inputs = fs.readFileSync(filename).toString('utf8')

const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  
  let start;
  let end;
  const heightMap = inputs.split("\n").map((line, x) =>
    line.split("").map((c, y) => {
      if (c === "S") {
        start = [x, y];
        return 0;       //min height
      } else if (c === "E") {
        end = [x, y];
        return 25;      //max height
      } else {
        return c.charCodeAt() - 97;
      }
    })
  );
  
  const [startX, startY] = start;
  const [targetX, targetY] = end;
  
  // tracks where we want to visit next, lowest priority first
  let frontier = [{ pos: start, prio: 0 }];
  const enqueue = (pos, prio) => {
    const index = frontier.findIndex((i) => i.prio > prio);
    if (index !== -1) {
      frontier.splice(index, 0, { pos, prio });
    } else {
      frontier.push({ pos, prio });
    }
  };
  
  // tracks where we came from moving to the position (best choice)
  const visitedFrom = Array.from(Array(heightMap.length), () =>
    Array(heightMap[0].length)
  );
  
  // tracks movements made up to the position
  const costs = Array.from(Array(heightMap.length), () =>
    Array(heightMap[0].length)
  );
  
  costs[startX][startY] = 0;
  search: while (frontier.length > 0) {
    const current = frontier.shift();
    const [x, y] = current.pos;
    for (const [i, j] of directions) {
      const a = x + i;
      const b = y + j;
      if (heightMap[a] !== undefined && heightMap[a][b] !== undefined) {
        const nextHeight = heightMap[a][b];
        const prevHeight = heightMap[x][y];
        const heightDiff = nextHeight - prevHeight;
        const prevCosts = costs[x][y];
        const nextCosts = prevCosts + 1;
        if (
          heightDiff < 2 &&
          (costs[a][b] === undefined || nextCosts < prevCosts)
        ) {
          if (a === targetX && b === targetY) {
            visitedFrom[a][b] = [x, y];
            break search;
          } else {
            const priority = Math.abs(targetX - a) + Math.abs(targetY - a); // manhattan distance
            enqueue([a, b], priority);
            visitedFrom[a][b] = [x, y];
            costs[a][b] = nextCosts;
          }
        }
      }
    }
  }
  
  let steps = 0;
  let currentX = targetX;
  let currentY = targetY;
  do {
    [currentX, currentY] = visitedFrom[currentX][currentY];
    steps += 1;
  } while (currentX !== startX || currentY !== startY);
  

console.log('Part 1, What is the fewest steps required to move from your current position to the location that should get the best signal? =', steps); 
