import Board from "./content/Board";

import GenerateBoard from "./utils/generateBoard";

export default function App() {
  // create a function
  const grid: number[] = GenerateBoard(3, 3, 1);
  console.log(grid);

  return (
    // <h1>hi</h1>
    <Board numRows={4} numCols={4} grid={grid} />
  );
}
