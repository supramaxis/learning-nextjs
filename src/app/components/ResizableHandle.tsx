import { useRef } from "react";

type ResizableHandleProps = {
  column: any;
  onDrag: (e: MouseEvent) => void;
};

const ResizableHandle: React.FC<ResizableHandleProps> = ({
  column,
  onDrag,
}) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    onDrag(e.nativeEvent);
  };

  return (
    <div
      ref={handleRef}
      className="absolute left-0 top-0 bottom-0 cursor-col-resize"
      onMouseDown={handleMouseDown}
      style={{ left: `${column.width}px`, zIndex: 100 }}
    ></div>
  );
};

export default ResizableHandle;
