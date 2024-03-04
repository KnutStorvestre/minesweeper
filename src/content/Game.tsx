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

  // TODO get custom message for how many mines you were able to flag
  // TODO mines you were able to flag appears with green background when game is lost or won
  // TODO is the win condition when all non-mine cells are visible and all mines are flagged or when all mines are flagged?
  // TODO create a high score system
  // TODO create a settings menu
  // TODO create full screen mode / zen mode

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
        onRestart={onRestart}
        gameStatus={gameStatus}
      />
      <Board
        numRows={rows}
        numCols={columns}
        numMines={mines}
        grid={grid}
        onFlagChange={handleFlagChange}
        isGameStarted={isGameInProgress}
        isGameLost={() => gameStatus === GameStatus.Lost}
        isGameWon={() => gameStatus === GameStatus.Won}
        // Doing it this way instead of using useCallback to memoize the function can be a performance hit but makes the code easier to read
        onStartGame={() => setGameStatus(GameStatus.InProgress)}
        onVictory={() => setGameStatus(GameStatus.Won)}
        onLoss={() => setGameStatus(GameStatus.Lost)}
      />
    </div>
  );
};

export default Game;
