import { useEffect, useState } from "react";
import "./Header.css";

interface HeaderProps {
  flagsLeft: number;
  handleFlagChange: (change: number) => void;
  isGameInProgress: () => boolean;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  flagsLeft,
  handleFlagChange,
  isGameInProgress,
  onRestart,
}) => {
  return (
    <div className="header-container">
      <div className="flags-container">
        <span>{String(flagsLeft).padStart(2, "0")}</span>
      </div>
      <div className="status-container">
        <button onClick={onRestart}>restart</button>
      </div>
      <div className="timer-container">
        <Timer isGameInProgress={isGameInProgress} />
      </div>
    </div>
  );
};

const Timer: React.FC<{ isGameInProgress: () => boolean }> = ({
  isGameInProgress,
}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer < 999 && isGameInProgress()) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, isGameInProgress]);

  const formattedTime = String(timer).padStart(3, "0");

  return <span>{formattedTime}</span>;
};

export default Header;
