import { useState, useCallback } from "react";

const useFlagCount = (
  initialCount: number
): [number, (flagChange: number) => void, () => void] => {
  const [flagsCount, setFlagCount] = useState(initialCount);

  const handleFlagChange = useCallback((flagChange: number): void => {
    setFlagCount((flagsCount) => flagsCount + flagChange);
  }, []);

  const resetFlagCount = useCallback(() => {
    setFlagCount(initialCount);
  }, [initialCount]);

  return [flagsCount, handleFlagChange, resetFlagCount];
};

export default useFlagCount;
