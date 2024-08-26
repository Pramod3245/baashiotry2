import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function DroppableArea({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-area",
  });

  const style = {
    border: "2px dashed gray",
    padding: "20px",
    minHeight: "600px",
    backgroundColor: isOver ? "#e0e0e0" : "#fff",
    transition: "background-color 0.3s ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
