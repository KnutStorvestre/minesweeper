import { useEffect, useState } from "react";
import "./Header.css";

interface HeaderProps {
  minesRemaining: number;
  isGameStarted: boolean;
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
        <Timer />
      </div>
    </div>
  );
};

function Timer() {
  const [timer, setTimer] = useState(0);

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
