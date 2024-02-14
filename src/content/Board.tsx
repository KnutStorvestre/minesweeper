import React, { useState } from "react";
import "../utils/getNeighbors";
import "./Board.css";
import getNeighbors from "../utils/getNeighbors";

interface CellProps {
  value: number;
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
      {visible && value !== 0 ? value : null}
    </button>
  );
};

interface BoardProps {
  numRows: number;
  numCols: number;
  grid: number[];
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
    const newGrid = [...grid];
    newIsVisible[i] = true;
    setIsVisible(newIsVisible);
    if (grid[i] === 0) {
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
    newGrid: number[]
  ) {
    const dfs = (cellIndex: number) => {
      const neighbors = getNeighbors(cellIndex, numRows, numCols);
      for (const nullNeighbor of neighbors) {
        if (!newIsVisible[nullNeighbor] && newGrid[nullNeighbor] === 0) {
          newIsVisible[nullNeighbor] = true;
          dfs(nullNeighbor);
        }
      }
    };

    dfs(index);
    setIsVisible(newIsVisible);
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
