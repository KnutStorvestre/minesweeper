import generateBoard from "../utils/generateBoard";

describe("generateBoard", () => {
  it("should generate a board with the correct dimensions", () => {
    const numRows = 5;
    const numCols = 5;
    const numMines = 3;
    const board = generateBoard(numRows, numCols, numMines);
    expect(board.length).toBe(numRows * numCols);
  });
});
