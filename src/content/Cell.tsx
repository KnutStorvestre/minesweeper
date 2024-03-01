import "./Cell.css";
import classNames from "classnames";

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
  const renderCellContent = () => {
    if (!visible) {
      return flagged ? "🚩" : null;
    }

    if (value === 0) {
      return null;
    }

    return value === -1 ? "💣" : value;
  };

  return (
    <button
      className={classNames("cell", {
        visible: visible,
        one: visible && value === 1,
        two: visible && value === 2,
        three: visible && value === 3,
        four: visible && value === 4,
        five: visible && value === 5,
        six: visible && value === 6,
        seven: visible && value === 7,
        eight: visible && value === 8,
      })}
      onClick={onCellClick}
      onContextMenu={onRightClick}
    >
      {renderCellContent()}
    </button>
  );
};

export default Cell;
