import React, { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import SaveMenu from "./SaveMenu";
import DroppableArea from "./DroppableArea";
import Elements from "./Elements";
import { saveLayoutToFirebase, loadLayoutFromFirebase } from "./firebaseUtils"; 

export default function MainBody() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Label" },
    { id: "2", title: "Input Box" },
    { id: "3", title: "Check Box" },
    { id: "4", title: "Button" },
    { id: "5", title: "Table" },
  ]);

  const [droppedTasks, setDroppedTasks] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "droppable-area") {
      const draggedTask = tasks.find((task) => task.id === active.id);
      if (draggedTask) {
        const newTask = {
          ...draggedTask,
          uniqueId: `${draggedTask.id}-${new Date().getTime()}`,
          name: draggedTask.title,
          isEditing: false,
        };
        setDroppedTasks((prev) => {
          const updatedTasks = [...prev, newTask];
          saveLayoutToFirebase(updatedTasks);
          return updatedTasks;
        });
      }
    }
  };

  
  const handleLoadLayout = (loadedLayout) => {
    setDroppedTasks(loadedLayout); 
  };

  
  useEffect(() => {
    const loadLayout = async () => {
      const savedLayout = await loadLayoutFromFirebase();
      if (savedLayout) {
        setDroppedTasks(savedLayout);
      }
    };
    loadLayout();
  }, []);

  const handleNameChange = (uniqueId, newName) => {
    setDroppedTasks((prev) =>
      prev.map((task) =>
        task.uniqueId === uniqueId ? { ...task, name: newName } : task
      )
    );
  };

  const toggleEditing = (uniqueId) => {
    setDroppedTasks((prev) =>
      prev.map((task) =>
        task.uniqueId === uniqueId
          ? { ...task, isEditing: !task.isEditing }
          : task
      )
    );
  };

  const renderDroppedElements = () => {
    const rows = [];
    let currentRow = [];

    droppedTasks.forEach((task, index) => {
      if (currentRow.length === 2) {
        rows.push(currentRow);
        currentRow = [];
      }

      currentRow.push(renderDroppedElement(task));

      if (index === droppedTasks.length - 1) {
        rows.push(currentRow);
      }
    });

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex flex-row space-x-4 mb-4">
        {row}
      </div>
    ));
  };

  const renderDroppedElement = (task) => {
    if (task.isEditing) {
      return (
        <input
          key={task.uniqueId}
          type="text"
          value={task.name}
          onChange={(e) => handleNameChange(task.uniqueId, e.target.value)}
          onBlur={() => toggleEditing(task.uniqueId)}
          autoFocus
          className="border border-gray-400 p-2"
        />
      );
    }

    switch (task.title) {
      case "Label":
        return (
          <label
            className="text-black text-xl border border-black m-2 p-3 rounded-xl"
            key={task.uniqueId}
            onClick={() => toggleEditing(task.uniqueId)}
            style={{ cursor: "pointer" }}
          >
            {task.name}
          </label>
        );
      case "Input Box":
        return (
          <input
            className="border border-black p-2 rounded-xl"
            key={task.uniqueId}
            type="text"
            placeholder="Input Box"
          />
        );
      case "Check Box":
        return (
          <div key={task.uniqueId}>
            <input type="checkbox" id={`checkbox-${task.uniqueId}`} />
            <label htmlFor={`checkbox-${task.uniqueId}`}>Check Box</label>
          </div>
        );
      case "Button":
        return (
          <button
            className="border border-blue-500 bg-blue-400 p-3 m-1 rounded-xl"
            key={task.uniqueId}
            onClick={() => toggleEditing(task.uniqueId)}
            style={{ cursor: "pointer" }}
          >
            {task.name}
          </button>
        );
      case "Table":
        return (
          <table
            className="border border-black p-2"
            key={task.uniqueId}
            border="1"
          >
            <thead>
              <tr className="border border-black p-2">
                <th className="border border-black p-2">Header 1</th>
                <th className="border border-black p-2">Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">Data 1</td>
                <td className="border border-black p-2">Data 2</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="flex flex-row p-5 h-screen">
        <div className="basis-[30%]" id="col1">
          <h2 className="border-black border-b-2">Drag and Drop elements from here</h2>
          <Elements tasks={tasks} />
        </div>

        <div className="basis-[70%] border-l border-black text-center" id="col2">
          <h2 className="border-black border-b-2">Your White Board (Drag and Drop here)</h2>
          <SaveMenu layout={droppedTasks} onLoadLayout={handleLoadLayout} />
          <DroppableArea>{renderDroppedElements()}</DroppableArea>
        </div>
      </div>
    </DndContext>
  );
}
