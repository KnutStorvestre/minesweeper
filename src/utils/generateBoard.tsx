import getNeighbors from "./getNeighbors";

export default function generateBoard(
  numRows: number,
  numCols: number,
  numMines: number
) {
  // const numCells = numRows * numCols;
  const board = generateMines(numRows, numCols, numMines);

  return board;
}

function generateMines(
  numRows: number,
  numCols: number,
  numMines: number
): (number | null)[] {
  const numCells = numRows * numCols;
  let board: (number | null)[] = Array(numCells).fill(null);

  for (let i = 0; i < numMines; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * numCells);
    } while (board[randomIndex] !== null);
    board[randomIndex] = -1;
    // board = incrementCellsAroundIndex(randomIndex, numCols, numCells, board);
    board = incrementCellsAroundIndex2(randomIndex, numRows, numCols, board);
  }

  return board;
}

function incrementCellsAroundIndex2(
  index: number,
  numRows: number,
  numCols: number,
  CellVals: (number | null)[]
) {
  const newCells = CellVals.slice();
  const neighborsIndices = getNeighbors(index, numRows, numCols);
  for (const neighborIndex of neighborsIndices) {
    if (!checkIfMine(neighborIndex, CellVals)) {
      if (CellVals[neighborIndex] !== null) {
        newCells[neighborIndex] = (CellVals[neighborIndex] as number) + 1;
      } else {
        newCells[neighborIndex] = 1;
      }
    }
  }

  return newCells;
}

function checkIfMine(i: number, CellVals: (number | null)[]) {
  return CellVals[i] === -1;
}
