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
  return (
    <div className="game-container">
      <Header minesRemaining={mines} isGameOver={false} onRestart={() => {}} />
      <Board
        numRows={rows}
        numCols={columns}
        grid={generateBoard(rows, columns, mines)}
      />
    </div>
  );
};

export default Game;
