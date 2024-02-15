import generateBoard from "../utils/generateBoard";

describe("generateBoard", () => {
  const numRows = 5;
  const numCols = 5;
  const numMines = 5;

  test("board has correct size", () => {
    const board = generateBoard(numRows, numCols, numMines);
    expect(board.length).toBe(numRows * numCols);
  });

  test("board contains correct number of mines", () => {
    const board = generateBoard(numRows, numCols, numMines);
    const mineCount = board.filter((cell) => cell === -1).length;
    expect(mineCount).toBe(numMines);
  });

  test("mines are placed randomly", () => {
    const board1 = generateBoard(numRows, numCols, numMines);
    const board2 = generateBoard(numRows, numCols, numMines);
    expect(board1).not.toEqual(board2);
  });
});
