import getNeighbors from "./getNeighbors";

export default function generateBoard(
  numRows: number,
  numCols: number,
  numMines: number
): (number | null)[] {
  const numCells = numRows * numCols;
  const board: (number | null)[] = Array(numCells).fill(null);

  for (let i = 0; i < numMines; i++) {
    const randomIndex = getRandomEmptyIndex(numCells, board);
    board[randomIndex] = -1;
    incrementNeighborCells(randomIndex, numRows, numCols, board);
  }

  return board;
}

function getRandomEmptyIndex(
  numCells: number,
  board: (number | null)[]
): number {
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * numCells);
  } while (board[randomIndex] !== null);
  return randomIndex;
}

function incrementNeighborCells(
  index: number,
  numRows: number,
  numCols: number,
  cellValues: (number | null)[]
) {
  const neighborsIndices = getNeighbors(index, numRows, numCols);
  for (const neighborIndex of neighborsIndices) {
    if (!isMine(neighborIndex, cellValues)) {
      const currentValue = cellValues[neighborIndex] ?? 0;
      cellValues[neighborIndex] = currentValue + 1;
    }
  }
}

function isMine(i: number, cellValues: (number | null)[]) {
  return cellValues[i] === -1;
}
