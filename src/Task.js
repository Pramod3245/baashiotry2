import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ id, title}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
