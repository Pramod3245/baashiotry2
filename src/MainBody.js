import React, { useState } from "react";
import Elements from "./Elements";
import SaveMenu from "./SaveMenu";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function MainBody() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Label" },
    { id: 2, title: "InputBox" },
    { id: 3, title: "CheckBox" },
    { id: 4, title: "Button" },
    { id: 5, title: "Table" },
  ]);

  const getTaskPos= id=> tasks.findIndex(tasks => tasks.id=== id)

  const handleDragEnd= event =>{
    const {active, over}= event;

    if(active.id === over.id) return;

    setTasks(tasks=> {
      const originalPos= getTaskPos(active.id)
      const newPos= getTaskPos(over.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="flex flex-row p-5 h-screen" id="col1">
        <div className="basis-[30%]">
          <h2 className="border-black border-b-2">
            Drag and Drop elements from here
          </h2>
          <Elements tasks={tasks} />
        </div>
        <div
          className="basis-[70%] border-l border-black text-center"
          id="col2"
        >
          <h2 className="border-black border-b-2">
            Your White Board (Drag and Drop here)
          </h2>
          <SaveMenu />
        </div>
      </div>
    </DndContext>
  );
}
