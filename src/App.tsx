import Board from "./content/Board";

import GenerateBoard from "./utils/generateBoard";

export default function App() {
  const numRows = 4;
  const numColumns = 4;
  const numMines = 0;

  const grid: number[] = GenerateBoard(numRows, numColumns, numMines);
  console.log(grid);

  return (
    // <h1>hi</h1>
    <Board numRows={numRows} numCols={numColumns} grid={grid} />
  );
}
