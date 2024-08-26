import React, { useState } from "react";
import { saveLayoutToFirebase, loadLayoutFromFirebase } from "./firebaseFunctions";

const SaveMenu = ({ layout, onLoadLayout }) => {
  const [layoutName, setLayoutName] = useState("");

  const handleSaveLayout = async () => {
    if (!layout || layout.length === 0) {
      alert("Layout is empty or undefined");
      return;
    }

    if (!layoutName) {
      alert("Please enter a layout name.");
      return;
    }

    try {
      await saveLayoutToFirebase(layoutName, layout);
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Error saving layout:", error);
      alert("Failed to save layout. Please try again.");
    }
  };

  const handleLoadLayout = async () => {
    if (!layoutName) {
      alert("Please enter a layout name.");
      return;
    }

    try {
      const loadedLayout = await loadLayoutFromFirebase(layoutName);
      if (loadedLayout) {
        onLoadLayout(loadedLayout); 
        alert("Layout loaded successfully!");
      } else {
        alert("No layout found with that name.");
      }
    } catch (error) {
      console.error("Error loading layout:", error);
      alert("Failed to load layout. Please try again.");
    }
  };

  const handlePublishLayout = async () => {
    if (!layoutName) {
      alert("Please enter a layout name.");
      return;
    }
  
    try {
      const loadedLayout = await loadLayoutFromFirebase(layoutName);
  
      if (loadedLayout) {
        const newWindow = window.open("", "_blank");
  
        newWindow.document.write(`
          <html>
            <head>
              <title>Published Layout</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 p-4"></body>
          </html>
        `);
        newWindow.document.close();
  
        newWindow.onload = function () {
          loadedLayout.forEach((element) => {
            let htmlElement;
  
            const content = element.title || element.content || "Default Content";
  
            switch (element.type) {
              case "button":
                htmlElement = document.createElement("button");
                htmlElement.textContent = content;
                htmlElement.className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition";
                break;
              case "table":
                htmlElement = document.createElement("table");
                htmlElement.innerHTML = element.content || "<tr><td>Table Content</td></tr>";
                htmlElement.className = "min-w-full bg-white border-collapse";
                const tableRows = htmlElement.querySelectorAll("tr");
                tableRows.forEach(row => row.className = "border-b bg-gray-50");
                const tableCells = htmlElement.querySelectorAll("td");
                tableCells.forEach(cell => cell.className = "px-4 py-2 border");
                break;
              case "checkbox":
                htmlElement = document.createElement("input");
                htmlElement.type = "checkbox";
                htmlElement.checked = element.content === "checked";
                htmlElement.className = "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500";
                break;
              default:
                htmlElement = document.createElement("div");
                htmlElement.innerHTML = content; 
                htmlElement.className = "p-4 bg-white shadow rounded-md";
                break;
            }
  
            newWindow.document.body.appendChild(htmlElement);
          });
        };
      } else {
        alert("No layout found with that name.");
      }
    } catch (error) {
      console.error("Error publishing layout:", error);
      alert("Failed to publish layout. Please check your internet connection and try again.");
    }
  };
  
  

  return (
    <div>
      <input
        className="border border-black m-2 p-3"
        type="text"
        placeholder="Enter layout name"
        value={layoutName}
        onChange={(e) => setLayoutName(e.target.value)}
      />
      <button className=" bg-black text-white p-2 m-3 rounded-xl" onClick={handleSaveLayout}>Save Layout</button>
      <button className=" bg-black text-white p-2 m-3 rounded-xl" onClick={handleLoadLayout}>Load Layout</button>
      <button className=" bg-black text-white p-2 m-3 rounded-xl" onClick={handlePublishLayout}>Publish Layout</button>
    </div>
  );
};

export default SaveMenu;
