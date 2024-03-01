import getNeighbors from "./getNeighbors";

function generateBoard(
  numRows: number,
  numCols: number,
  numMines: number
): number[] {
  const numCells = numRows * numCols;
  const board: number[] = Array(numCells).fill(0); 

  const emptyIndices = new Set<number>(Array.from({ length: numCells }, (_, i) => i)); 

  for (let i = 0; i < numMines; i++) {
    const randomIndex = getRandomEmptyIndex(emptyIndices);
    board[randomIndex] = -1;
    incrementNeighborCells(randomIndex, numRows, numCols, board);
    emptyIndices.delete(randomIndex);
  }

  return board;
}

function getRandomEmptyIndex(emptyIndices: Set<number>): number {
  const randomIndex = Math.floor(Math.random() * emptyIndices.size);
  return [...emptyIndices][randomIndex];
}

function incrementNeighborCells(
  index: number,
  numRows: number,
  numCols: number,
  cellValues: number[]
) {
  const neighborsIndices = getNeighbors(index, numRows, numCols);
  for (const neighborIndex of neighborsIndices) {
    if (cellValues[neighborIndex] !== -1) {
      cellValues[neighborIndex]!++;
    }
  }
}

export default generateBoard;
