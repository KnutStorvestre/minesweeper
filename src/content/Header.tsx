import { useEffect, useState } from "react";
import "./Header.css";

interface HeaderProps {
  minesRemaining: number;
  isGameOver: boolean;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  minesRemaining,
  isGameStarted,
  isGameOver,
  onRestart,
}) => {
  return (
    <div className="header-container">
      <div className="flags" />
      <div className="status" />
      <div className="timer">
        <Timer />
      </div>
    </div>
  );
};

function Timer() {
  const [timer, setTimer] = useState(995);

  useEffect(() => {
    if (timer < 999) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer]);

  const formattedTime = String(timer).padStart(3, "0");

  return <span>{formattedTime}</span>;
}

export default Header;

/*
 <div className="logo">Minesweeper</div>
      <div className="info">
        <div className="mines-remaining">Mines Remaining: {minesRemaining}</div>
        {isGameOver && <div className="game-over">Game Over!</div>}
        <button className="restart-button" onClick={onRestart}>
          Restart
        </button>
      </div>
      */
