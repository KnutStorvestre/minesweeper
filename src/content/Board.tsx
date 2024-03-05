import { useState } from "react";
import "../utils/getNeighbors";
import getNeighbors from "../utils/getNeighbors";
import Cell from "./Cell";
import "./Board.css";

interface BoardProps {
  numRows: number;
  numCols: number;
  numMines: number;
  grid: number[];
  onFlagChange: (flagChange: number) => void;
  isGameStarted: () => boolean;
  isGameLost: () => boolean;
  isGameWon: () => boolean;
  onStartGame: () => void;
  onVictory: () => void;
  onLoss: () => void;
}

// TODO implemented win
const Board: React.FC<BoardProps> = ({
  numRows,
  numCols,
  numMines,
  grid,
  onFlagChange,
  isGameStarted,
  isGameLost,
  isGameWon,
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
  const [flagCount, setFlagCount] = useState(0);

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
    if (flagCount === numMines) {
      checkWinCondition(newIsVisible);
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
    // TODO is this function too expensive?
    if (!isFlagged[i] && flagCount === numMines) {
      return;
    }

    const newFlagcount = flagCount + (isFlagged[i] ? -1 : 1);
    setFlagCount(newFlagcount);
    onFlagChange(isFlagged[i] ? 1 : -1);

    const newIsFlagged = [...isFlagged];
    newIsFlagged[i] = !newIsFlagged[i];
    setIsFlagged(newIsFlagged);
    if (newFlagcount === numMines) {
      checkWinCondition(isVisible);
    }
  };

  function checkWinCondition(newIsVisible: boolean[]) {
    const isVisibleCount = newIsVisible.reduce((count, currValue) => {
      return currValue ? count + 1 : count;
    }, 0);
    if (isVisibleCount === numRows * numCols - numMines) {
      onVictory();
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
          // Change background color to red if game is lost by pressing this cell and it's a mine
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
