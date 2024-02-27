import { useState } from "react";
import Board from "./Board";
import Header from "./Header";
import generateBoard from "../utils/generateBoard.ts";
import "./Game.css";

interface GameProps {
  rows: number;
  columns: number;
  mines: number;
}

const Game: React.FC<GameProps> = ({ rows, columns, mines }) => {
  enum GameStatus {
    NotStarted = "notStarted",
    InProgress = "inProgress",
    Won = "won",
    Lost = "lost",
  }

  const [gameStatus, setGameStatus] = useState(GameStatus.NotStarted);

  const handleStartGame = () => {
    setGameStatus(GameStatus.InProgress);
  };

  const isGameInProgress = () => {
    return gameStatus === GameStatus.InProgress;
  };

  const [flagsCount, setFlagCount] = useState(mines);
  const handleFlagChange = (flagChange: number) => {
    setFlagCount((prev) => prev + flagChange);
  };

  const [key, setKey] = useState(0);
  const onRestart = () => {
    setKey((prev) => prev + 1);
    setGameStatus(GameStatus.NotStarted);
  };

  return (
    <div className="game-container" key={key}>
      <Header
        flagsLeft={flagsCount}
        handleFlagChange={handleFlagChange}
        isGameInProgress={isGameInProgress}
        onRestart={() => onRestart()}
      />
      <Board
        numRows={rows}
        numCols={columns}
        grid={generateBoard(rows, columns, mines)}
        isGameStarted={isGameInProgress}
        onStartGame={handleStartGame}
      />
    </div>
  );
};

export default Game;
