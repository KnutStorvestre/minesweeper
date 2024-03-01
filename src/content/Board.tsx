import { useState } from "react";
import "../utils/getNeighbors";
import getNeighbors from "../utils/getNeighbors";
import Cell from "./Cell";
import "./Board.css";

interface BoardProps {
  numRows: number;
  numCols: number;
  grid: number[];
  isGameStarted: () => boolean;
  isGameLost: () => boolean;
  isGameWon: () => boolean;
  onFlagChange: (flagChange: number) => void;
  onStartGame: () => void;
  onVictory: () => void;
  onLoss: () => void;
}

const Board: React.FC<BoardProps> = ({
  numRows,
  numCols,
  grid,
  isGameStarted,
  isGameLost,
  isGameWon,
  onFlagChange,
  onStartGame,
  onVictory,
  onLoss,
}) => {
  const handleFirstClick = () => {
    onStartGame();
  };
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(numRows * numCols).fill(false)
  );
  const [isFlagged, setIsFlagged] = useState<boolean[]>(
    Array(numRows * numCols).fill(false)
  );

  function handleClick(i: number) {
    if (isVisible[i] || isFlagged[i] || isGameLost() || isGameWon()) {
      return;
    }
    if (!isGameStarted()) {
      handleFirstClick();
    }
    const newIsVisible = [...isVisible];
    const newGrid = [...grid];
    newIsVisible[i] = true;
    setIsVisible(newIsVisible);
    if (grid[i] === 0) {
      setNullCellsVisible(i, newIsVisible, newGrid);
    } else if (grid[i] === -1) {
      onLoss();
      setAllMinesVisible();
    }
  }

  function setAllMinesVisible() {
    const newIsVisible = [...isVisible];
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === -1) {
        newIsVisible[i] = true;
      }
    }
    setIsVisible(newIsVisible);
  }

  const handleRightClick = (event: React.MouseEvent, i: number) => {
    event.preventDefault();
    if (isVisible[i] || !isGameStarted()) {
      return;
    }

    onFlagChange(isFlagged[i] ? 1 : -1);

    const newIsFlagged = [...isFlagged];
    newIsFlagged[i] = !newIsFlagged[i];
    setIsFlagged(newIsFlagged);
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
          flagged={isFlagged[cellNum]}
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
