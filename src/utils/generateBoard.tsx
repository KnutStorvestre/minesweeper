export default function generateBoard(
  numRows: number,
  numCols: number,
  numMines: number
) {
  const numCells = numRows * numCols;
  const board: number[] = generateMines(numMines, numCells, numCols);

  return board;
}

function generateMines(numMines: number, numCells: number, numCols: number) {
  let board: number[] = Array(numCells).fill(null);

  for (let i = 0; i < numMines; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * numCells);
    } while (board[randomIndex] !== null);
    board[randomIndex] = -1;
    board = incrementCellsAroundIndex(randomIndex, numCols, numCells, board);
  }

  return board;
}

function incrementCellsAroundIndex(
  index: number,
  numCols: number,
  numCells: number,
  CellVals: number[]
) {
  const cellAboveLeft = index - numCols - 1;
  const cellAbove = index - numCols;
  const cellAboveRight = index - numCols + 1;

  const cellLeft = index - 1;
  const cellRight = index + 1;

  const cellBelowLeft = index + numCols - 1;
  const cellBelow = index + numCols;
  const cellBelowRight = index + numCols + 1;

  const newCells = CellVals.slice();

  // above cells
  if (index >= numCols) {
    // above left
    if (index % numCols !== 0) {
      if (!checkIfMine(cellAboveLeft, CellVals)) {
        newCells[cellAboveLeft] = CellVals[cellAboveLeft] + 1;
      }
    }
    // above
    if (!checkIfMine(cellAbove, CellVals)) {
      newCells[cellAbove] = CellVals[cellAbove] + 1;
    }
    //above right
    if ((index + 1) % numCols !== 0) {
      if (!checkIfMine(cellAboveRight, CellVals)) {
        newCells[cellAboveRight] = CellVals[cellAboveRight] + 1;
      }
    }
  }

  // left
  if (index % numCols !== 0) {
    if (!checkIfMine(cellLeft, CellVals)) {
      newCells[cellLeft] = CellVals[cellLeft] + 1;
    }
  }
  // right
  if ((index + 1) % numCols !== 0) {
    if (!checkIfMine(cellRight, CellVals)) {
      newCells[cellRight] = CellVals[cellRight] + 1;
    }
  }

  // bellow cells
  if (index < numCells - numCols) {
    // bellow left
    if (index % numCols !== 0) {
      if (!checkIfMine(cellBelowLeft, CellVals)) {
        newCells[cellBelowLeft] = CellVals[cellBelowLeft] + 1;
      }
    }
    // bellow
    if (!checkIfMine(cellBelow, CellVals)) {
      newCells[cellBelow] = CellVals[cellBelow] + 1;
    }
    //bellow right
    if ((index + 1) % numCols !== 0) {
      if (!checkIfMine(cellBelowRight, CellVals)) {
        newCells[cellBelowRight] = CellVals[cellBelowRight] + 1;
      }
    }
  }

  return newCells;
}

function checkIfMine(i: number, CellVals: (number | string)[]) {
  return CellVals[i] === -1;
}
