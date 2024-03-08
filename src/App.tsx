import { useState } from "react";
import Game from "./content/Game";
import DifficultySelector from "./content/DifficultySelector";

type DifficultyLevel = "beginner" | "intermediate" | "expert";

interface DifficultySetting {
  rows: number;
  columns: number;
  mines: number;
}

const difficulties: Record<DifficultyLevel, DifficultySetting> = {
  beginner: { rows: 9, columns: 9, mines: 10 },
  intermediate: { rows: 16, columns: 16, mines: 40 },
  expert: { rows: 16, columns: 30, mines: 99 },
};

export default function App() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);

  return (
    <div className={difficulty ? "" : "page-center"}>
      {difficulty ? (
        <Game
          rows={difficulties[difficulty].rows}
          columns={difficulties[difficulty].columns}
          mines={difficulties[difficulty].mines}
        />
      ) : (
        <DifficultySelector onDifficultySelect={setDifficulty} />
      )}
    </div>
  );
}
