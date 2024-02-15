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

/*
import React from "react";
import { render, screen } from "@testing-library/react";
import Board from "../components/Board";

describe("Board", () => {
  it("should render the board with the correct number of cells", () => {
    const numRows = 5;
    const numCols = 5;
    const numMines = 3;
    render(<Board numRows={numRows} numCols={numCols} numMines={numMines} />);
    const cells = screen.getAllByTestId("cell");
    expect(cells.length).toBe(numRows * numCols);
  });

  it("should reveal the clicked cell when clicked", () => {
    const numRows = 5;
    const numCols = 5;
    const numMines = 3;
    render(<Board numRows={numRows} numCols={numCols} numMines={numMines} />);
    const cell = screen.getByTestId("cell-0-0");
    fireEvent.click(cell);
    expect(cell).toHaveClass("revealed");
  });

  // Add more tests as needed...

});
*/
