import { useEffect, useState } from "react";
import "./Header.css";
import GameStatus from "../utils/gameStatus";
import deadSmiley from "../assets/images/dead-smiley.png";
import winSmiley from "../assets/images/win-smiley.png";
import normalSmiley from "../assets/images/normal-smiley.png";

interface HeaderProps {
  flagsLeft: number;
  onRestart: () => void;
  gameStatus: GameStatus;
}

const Header: React.FC<HeaderProps> = ({
  flagsLeft,
  onRestart,
  gameStatus,
}) => {
  const [statusImg, setStatusImg] = useState(normalSmiley);

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.Won:
        setStatusImg(winSmiley);
        break;
      case GameStatus.Lost:
        setStatusImg(deadSmiley);
        break;
      default:
        setStatusImg(normalSmiley);
    }
  }, [gameStatus]);

  return (
    <div className="header-container">
      <div className="flags-container">
        <span>{String(flagsLeft).padStart(3, "0")}</span>
      </div>
      <div className="status-container">
        <button onClick={onRestart} className="image-button">
          <img src={statusImg} alt="Status" className="status-image" />
        </button>
      </div>
      <div className="timer-container">
        <Timer isGameInProgress={gameStatus === GameStatus.InProgress} />
      </div>
    </div>
  );
};

const Timer: React.FC<{ isGameInProgress: boolean }> = ({
  isGameInProgress,
}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer < 999 && isGameInProgress) {
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
