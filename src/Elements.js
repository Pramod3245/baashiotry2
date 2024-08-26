import React from "react";
import Task from "./Task";

export default function Elements({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task id={task.id} title={task.title} key={task.id} />
      ))}
    </div>
  );
}
