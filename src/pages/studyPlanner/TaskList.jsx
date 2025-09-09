import React from "react";

const TaskList = ({ goal, onToggleCompletion }) => {
  
  const handleCheckboxChange = (taskId) => {
    onToggleCompletion(goal._id, taskId);
  };

  return (
    <ul className="mt-4 space-y-2">
      {goal.tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleCheckboxChange(task._id)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            />
            <span
              className={`text-gray-900 ${
                task.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
