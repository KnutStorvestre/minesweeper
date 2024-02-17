import React, { useState } from "react";
import "../utils/getNeighbors";
import "./Board.css";
import getNeighbors from "../utils/getNeighbors";

interface CellProps {
  value: number;
  visible: boolean;
  onCellClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({
  value,
  visible,
  onCellClick,
  onRightClick,
}) => {
  return (
    <button
      className="cell"
      onClick={onCellClick}
      onContextMenu={onRightClick}
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

  const handleRightClick = (event: React.MouseEvent, cellNum: number) => {
    event.preventDefault();

    // console.log("Right click");
    // Implement the logic for right-click action
    // For example, toggle a flag state for the cell
  };

  // Sets all cells with null value directly or indirectly around the index to visible
  // uses the DFS-algorithm
  function setNullCellsVisible(
    index: number,
    newIsVisible: boolean[],
    newGrid: number[]
  ) {
    const dfs = (cellIndex: number) => {
      const neighbors = getNeighbors(cellIndex, numRows, numCols);
      for (const neighbor of neighbors) {
        if (!newIsVisible[neighbor]) {
          newIsVisible[neighbor] = true;
          if (newGrid[neighbor] === 0) {
            dfs(neighbor);
          }
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
          onRightClick={(event) => handleRightClick(event, cellNum)}
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
