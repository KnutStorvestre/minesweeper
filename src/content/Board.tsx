import React, { useState } from "react";
import "./Board.css";

interface CellProps {
  value: number | null;
  visible: boolean;
  onCellClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, visible, onCellClick }) => {
  return (
    <button
      className="cell"
      onClick={onCellClick}
      style={{ background: visible ? "#fff" : "lightgray" }}
    >
      {visible ? value : null}
    </button>
  );
};

interface BoardProps {
  numRows: number;
  numCols: number;
  grid: (number | null)[];
}

const Board: React.FC<BoardProps> = ({ numRows, numCols, grid }) => {
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(numRows * numCols).fill(false)
  );

  function handleClick(i: number) {
    if (isVisible[i]) {
      return;
    }
    const newIsVisible = [...isVisible];
    // Recommended to keep immutability
    const newGrid = [...grid];
    newIsVisible[i] = true;
    setIsVisible(newIsVisible);
    if (grid[i] === null) {
      setNullCellsVisible(i, newIsVisible, newGrid);
    } else {
      setIsVisible(newIsVisible);
    }
  }

  // Sets all cells with null value directly or indirectly around the index to visible
  // uses the DFS-algorithm
  function setNullCellsVisible(
    index: number,
    newIsVisible: boolean[],
    newGrid: (number | null)[]
  ) {
    // const newIsVisible = isVisible.slice();
    // newIsVisible[index] = true;
    // setIsVisible(newIsVisible);

    const dfs = (cellIndex: number) => {
      const nullNeighbors = getNeighbors(cellIndex);
      for (const nullNeighbor of nullNeighbors) {
        if (!newIsVisible[nullNeighbor] && newGrid[nullNeighbor] === null) {
          newIsVisible[nullNeighbor] = true;
          dfs(nullNeighbor);
        }
      }
    };

    dfs(index);
    setIsVisible(newIsVisible);
  }

  function getNeighbors(index: number) {
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

  const board = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      const cellNum = i * numCols + j;
      row.push(
        <Cell
          key={cellNum}
          value={grid[cellNum]}
          visible={isVisible[cellNum]}
          onCellClick={() => handleClick(cellNum)}
        />
      );
    }
    board.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return <>{board}</>;
};

export default Board;
