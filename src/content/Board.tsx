import React, { useState } from "react";
import "./Board.css";

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
      {visible ? value : null}
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
    Array(numRows * numCols).fill(true)
  );

  function handleClick(i: number) {
    const newIsVisible = [...isVisible];
    newIsVisible[i] = true;
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
