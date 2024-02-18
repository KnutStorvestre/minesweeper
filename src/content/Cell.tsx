import "./Cell.css";

interface CellProps {
  value: number;
  visible: boolean;
  flagged: boolean;
  onCellClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({
  value,
  visible,
  flagged,
  onCellClick,
  onRightClick,
}) => {
  return (
    <button
      className={
        "cell" +
        (visible
          ? " visible" + (value === 1 ? " one" : "")
          : //(value === 2 ? " two" : "")
            "")
      }
      onClick={onCellClick}
      onContextMenu={onRightClick}
    >
      {visible ? (value !== 0 ? value : null) : flagged ? "🚩" : null}
    </button>
  );
};

// className={`cell ${visible ? "visible" : ""} ${visible && value === 1 ? "one" : ""}`}

export default Cell;
