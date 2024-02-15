export default function getNeighbors(
  index: number,
  numRows: number,
  numCols: number
): number[] {
  const row = Math.floor(index / numCols);
  const col = index % numCols;
  const neighbors: number[] = [];

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) {
        continue;
      }

      const neighborRow = row + dRow;
      const neighborCol = col + dCol;

      if (
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols
      ) {
        neighbors.push(neighborRow * numCols + neighborCol);
      }
    }
  }

  return neighbors;
}
