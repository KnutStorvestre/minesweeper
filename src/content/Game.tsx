import { useCallback, useState, useEffect } from "react";
import Board from "./Board";
import Header from "./Header";
import useFlagCount from "./hooks/useFlagCount";
import generateBoard from "../utils/generateBoard";
import GameStatus from "../utils/gameStatus";
import "./Game.css";

interface GameProps {
  rows: number;
  columns: number;
  mines: number;
}

const Game: React.FC<GameProps> = ({ rows, columns, mines }) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NotStarted);
  const [flagsCount, handleFlagChange, resetFlagCount] = useFlagCount(mines);
  const [key, setKey] = useState(0);
  // We use an arrow function because React treats this as a lazy initialization
  // so it will only be called once when the component mounts
  const [grid, setGrid] = useState(() => generateBoard(rows, columns, mines));

  const isGameInProgress = useCallback(() => {
    return gameStatus === GameStatus.InProgress;
  }, [gameStatus]);

  const onRestart = useCallback(() => {
    setKey((prev) => prev + 1);
    setGameStatus(GameStatus.NotStarted);
    setGrid(generateBoard(rows, columns, mines));
    resetFlagCount();
  }, [rows, columns, mines]);

  useEffect(() => {
    if (gameStatus === GameStatus.InProgress) {
      console.log("Game started");
    } else if (gameStatus === GameStatus.Won) {
      console.log("Game won");
    } else if (gameStatus === GameStatus.Lost) {
      console.log("Game lost");
    } else {
      console.log("Game not started");
    }
  }, [gameStatus]);

  return (
    <div className="game-container" key={key}>
      <Header
        flagsLeft={flagsCount}
        isGameInProgress={isGameInProgress}
        onRestart={onRestart}
      />
      <Board
        numRows={rows}
        numCols={columns}
        grid={grid}
        isGameStarted={isGameInProgress}
        isGameLost={() => gameStatus === GameStatus.Lost}
        isGameWon={() => gameStatus === GameStatus.Won}
        onFlagChange={handleFlagChange}
        // Doing it this way instead of using useCallback to memoize the function can be a performance hit but makes the code easier to read
        onStartGame={() => setGameStatus(GameStatus.InProgress)}
        onVictory={() => setGameStatus(GameStatus.Won)}
        onLoss={() => setGameStatus(GameStatus.Lost)}
      />
    </div>
  );
};

export default Game;
