import { useEffect, useState } from "react";
import "./Header.css";

interface HeaderProps {
  minesRemaining: number;
  isGameStarted: () => boolean;
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
      <div className="flags-container" />
      <div className="status-container">
        <button onClick={onRestart}>restart</button>
      </div>
      <div className="timer-container">
        <Timer gameStarted={isGameStarted} gameOver={isGameOver} />
      </div>
    </div>
  );
};

const Timer: React.FC<{ gameStarted: () => boolean; gameOver: boolean }> = ({
  gameStarted,
  gameOver,
}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer < 999 && gameStarted() && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, gameStarted, gameOver]);

  const formattedTime = String(timer).padStart(3, "0");

  return <span>{formattedTime}</span>;
};

export default Header;
