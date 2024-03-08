import React from "react";
import "./DifficultySelector.css";

type DifficultyLevel = "beginner" | "intermediate" | "expert";

interface DifficultySelectorProps {
  onDifficultySelect: (level: DifficultyLevel) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onDifficultySelect,
}) => {
  return (
    <div className="difficulty-selector">
      <h1>Minesweeper</h1>
      <h3>Select Difficulty</h3>
      <button onClick={() => onDifficultySelect("beginner")}>Beginner</button>
      <button onClick={() => onDifficultySelect("intermediate")}>
        Intermediate
      </button>
      <button onClick={() => onDifficultySelect("expert")}>Expert</button>
    </div>
  );
};

export default DifficultySelector;
