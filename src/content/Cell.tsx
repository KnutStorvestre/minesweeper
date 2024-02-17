interface CellProps {
  value: number;
  visible: boolean;
  onCellClick: () => void;
  onRightClick: (event: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({
  value,
  visible,
  onCellClick,
  onRightClick,
}) => {
  return (
    <button
      className="cell"
      onClick={onCellClick}
      onContextMenu={onRightClick}
      style={{ background: visible ? "#fff" : "lightgray" }}
    >
      {visible && value !== 0 ? value : null}
    </button>
  );
};

export default Cell;
