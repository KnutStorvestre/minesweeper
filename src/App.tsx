import Board from "./content/Board";
import generateBoard from "./utils/generateBoard.ts";

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

  return <Board numRows={numRows} numCols={numColumns} grid={grid} />;
}
