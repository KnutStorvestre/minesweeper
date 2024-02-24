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
  const [key, setKey] = useState(0);

  const onRestart = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="game-container" key={key}>
      <Header
        minesRemaining={mines}
        isGameStarted={false}
        isGameOver={false}
        onRestart={() => onRestart()}
      />
      <Board
        numRows={rows}
        numCols={columns}
        grid={generateBoard(rows, columns, mines)}
      />
    </div>
  );
};

export default Game;
