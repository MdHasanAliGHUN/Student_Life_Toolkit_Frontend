import React, { useState } from "react";

const TaskInput = ({ onSubmit, onCancel }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAdd = () => {
    if (taskTitle.trim() === "") return;
    onSubmit(taskTitle);
    setTaskTitle("");
  };

  return (
    <div className="mt-3 flex gap-2">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  );
};

export default TaskInput;
