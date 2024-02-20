import Board from "./content/Board";
import Header from "./content/Header";
import generateBoard from "./utils/generateBoard.ts";
import "./App.css";

export default function App() {
  // Beginner difficulty
  // 10 mines on a 9x9 grid

  // Intermediate difficulty
  // 40 mines on a 16x16 grid

  // Expert difficulty
  // 99 mines on a 16x30 grid

  const numRows = 16;
  const numColumns = 30;
  const numMines = 99;

  const grid = generateBoard(numRows, numColumns, numMines);

  // TODO Board component:
  // Implement a game over state
  // Implement a win state
  // sprite for mine

  // TODO Header component:
  // number flags left

  // Bonus:
  // Add extra realism
  // score board - but no nasty names

  return (
    <div className="board-container">
      <Header
        minesRemaining={numMines}
        isGameOver={false}
        onRestart={() => {}}
      />
      <Board numRows={numRows} numCols={numColumns} grid={grid} />
    </div>
  );
}
