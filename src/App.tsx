import Board from "./content/Board";
import GenerateBoard from "./utils/generateBoard";

export default function App() {
  const numRows = 4;
  const numColumns = 4;
  const numMines = 1;

  const grid: number[] = GenerateBoard(numRows, numColumns, numMines);

  return <Board numRows={numRows} numCols={numColumns} grid={grid} />;
}
