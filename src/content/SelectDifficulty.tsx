import React from "react";

type DifficultyLevel = "beginner" | "intermediate" | "expert";

interface DifficultySelectorProps {
  onDifficultySelect: (level: DifficultyLevel) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onDifficultySelect,
}) => {
  return (
    <div>
      <h2>Select Difficulty</h2>
      <button onClick={() => onDifficultySelect("beginner")}>Beginner</button>
      <button onClick={() => onDifficultySelect("intermediate")}>
        Intermediate
      </button>
      <button onClick={() => onDifficultySelect("expert")}>Expert</button>
    </div>
  );
};

export default DifficultySelector;
