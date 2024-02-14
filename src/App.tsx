import Board from "./content/Board";
import generateBoard from "./utils/generateBoard.ts";

export default function App() {
  const numRows = 5;
  const numColumns = 7;
  const numMines = 2;

  const grid = generateBoard(numRows, numColumns, numMines);

  return <Board numRows={numRows} numCols={numColumns} grid={grid} />;
}
