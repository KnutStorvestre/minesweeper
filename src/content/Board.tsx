import { useState } from "react";

export default function Board(
  numRows: number,
  numCols: number,
  grid: number[]
) {
  const [isVisible, setIsVisible] = useState(
    Array(numRows * numCols).fill(true)
  );

  function handleClick(i: number) {
    const newIsVisible = isVisible.slice();
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

  return <>{grid}</>;
}

function Cell(value: number, visible: boolean, onCellClick) {
  return (
    <button
      className="cell"
      onClick={onCellClick}
      style={{ background: visible ? "#fff" : "lightgray" }}
    >
      {visible ? value : null}
    </button>
  );
}
