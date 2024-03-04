import Game from "./content/Game";

export default function App() {
  // Beginner difficulty
  // 10 mines on a 9x9 grid

  // Intermediate difficulty
  // 40 mines on a 16x16 grid

  // Expert difficulty
  // 99 mines on a 16x30 grid

  const numRows = 9;
  const numColumns = 9;
  const numMines = 10;

  // TODO Game component:
  // width of game on Expert difficulty
  // 40px x 30 = 1200px

  // TODO Board component:
  // Implement a game over state
  // Implement a win state
  // sprite for mine

  // TODO Header component:
  // number flags left

  // Bonus:
  // Add extra realism
  // score board - but no nasty names
  // select cells with keyboard
  // add a timer when it runs out you lose

  return <Game rows={numRows} columns={numColumns} mines={numMines} />;
}
