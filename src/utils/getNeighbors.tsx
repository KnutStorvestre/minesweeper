export default function getNeighbors(
  index: number,
  numRows: number,
  numCols: number
) {
  const numCells = numRows * numCols;
  const cellAboveLeft = index - numCols - 1;
  const cellAbove = index - numCols;
  const cellAboveRight = index - numCols + 1;

  const cellLeft = index - 1;
  const cellRight = index + 1;

  const cellBelowLeft = index + numCols - 1;
  const cellBelow = index + numCols;
  const cellBelowRight = index + numCols + 1;

  const nullNeighbors: number[] = [];

  // above cells
  if (index >= numCols) {
    // above left
    if (index % numCols !== 0) {
      nullNeighbors.push(cellAboveLeft);
    }
    // above
    nullNeighbors.push(cellAbove);
    //above right
    if ((index + 1) % numCols !== 0) {
      nullNeighbors.push(cellAboveRight);
    }
  }

  // left
  if (index % numCols !== 0) {
    nullNeighbors.push(cellLeft);
  }
  // right
  if ((index + 1) % numCols !== 0) {
    nullNeighbors.push(cellRight);
  }

  // bellow cells
  if (index < numCells - numCols) {
    // bellow left
    if (index % numCols !== 0) {
      nullNeighbors.push(cellBelowLeft);
    }
    // bellow
    nullNeighbors.push(cellBelow);
    //bellow right
    if ((index + 1) % numCols !== 0) {
      nullNeighbors.push(cellBelowRight);
    }
  }

  return nullNeighbors;
}
