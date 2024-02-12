import Board from "./content/Board";
import generateBoard from "./utils/generateBoard";

export default function App() {
  const numRows = 4;
  const numColumns = 4;
  const numMines = 3;

  const grid = generateBoard(numRows, numColumns, numMines);

  return <Board numRows={numRows} numCols={numColumns} grid={grid} />;
}
