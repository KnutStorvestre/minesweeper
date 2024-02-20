interface HeaderProps {
  minesRemaining: number;
  isGameOver: boolean;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  minesRemaining,
  isGameOver,
  onRestart,
}) => {
  return (
    <div className="header">
      <div className="logo">Minesweeper</div>
      <div className="info">
        <div className="mines-remaining">Mines Remaining: {minesRemaining}</div>
        {isGameOver && <div className="game-over">Game Over!</div>}
        <button className="restart-button" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Header;
