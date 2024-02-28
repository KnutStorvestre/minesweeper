import { useCallback, useState, useEffect } from "react";
import Board from "./Board";
import Header from "./Header";
import useFlagCount from "./hooks/useFlagCount";
import generateBoard from "../utils/generateBoard.ts";
import "./Game.css";

enum GameStatus {
  NotStarted = "notStarted",
  InProgress = "inProgress",
  Won = "won",
  Lost = "lost",
}

interface GameProps {
  rows: number;
  columns: number;
  mines: number;
}

const Game: React.FC<GameProps> = ({ rows, columns, mines }) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NotStarted);
  const [flagsCount, handleFlagChange] = useFlagCount(mines);
  const [key, setKey] = useState(0);
  // We use an arrow function because React treats this as a lazy initialization
  // so it will only be called once when the component mounts
  const [grid, setGrid] = useState(() => generateBoard(rows, columns, mines));

  const handleStartGame = useCallback(() => {
    setGameStatus(GameStatus.InProgress);
  }, []);

  const isGameInProgress = useCallback(() => {
    return gameStatus === GameStatus.InProgress;
  }, [gameStatus]);

  const onRestart = useCallback(() => {
    setKey((prev) => prev + 1);
    setGameStatus(GameStatus.NotStarted);
    setGrid(generateBoard(rows, columns, mines));
  }, [rows, columns, mines]);

  useEffect(() => {
    // Any side effects related to game status change can go here
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
        onStartGame={handleStartGame}
        onFlagChange={handleFlagChange}
      />
    </div>
  );
};

export default Game;
