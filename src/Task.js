import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Task({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex flex-col p-4 mb-2 h-full items-center"
      style={style}
    >
      <button
        key={id}
        className="p-2 bg-black text-white border border-white rounded mb-5 w-3/4"
      >
        {title}
      </button>
    </div>
  );
}
