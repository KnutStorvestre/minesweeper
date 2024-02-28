import { useState, useCallback } from "react";

const useFlagCount = (
  initialCount: number
): [number, (flagChange: number) => void] => {
  const [flagsCount, setFlagCount] = useState(initialCount);

  const handleFlagChange = useCallback((flagChange: number): void => {
    setFlagCount((flagsCount) => flagsCount + flagChange);
  }, []);

  return [flagsCount, handleFlagChange];
};

export default useFlagCount;
