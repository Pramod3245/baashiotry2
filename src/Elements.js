import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

export default function Elements({ tasks }) {
  return (
    <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
      <div>
        {tasks.map((task) => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
      </div>
    </SortableContext>
  );
}
