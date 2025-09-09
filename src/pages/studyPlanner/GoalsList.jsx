import React, { useState } from "react";
import useStudyPlanner from "../../hooks/useStudyPlanner";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { MdDelete } from "react-icons/md";
const GoalsList = () => {
  const { goals, addATask, loading, error, toggleTaskCompletion, handleDeleteGoal } =
    useStudyPlanner();
  const [showTaskInput, setShowTaskInput] = useState(null);

  const handleAddTaskClick = (goalId) => {
    setShowTaskInput(goalId);
  };

  const handleCancel = () => {
    setShowTaskInput(null);
  };

  const handleSubmit = async (goalId, taskTitle) => {
    await addATask(goalId, taskTitle);
    setShowTaskInput(null);
  };

  const handleDeleteAGoal = async (id) => {
    try {
      await handleDeleteGoal(id);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="mt-8 space-y-5">
      {goals?.length > 0 ? (
        goals.map((goal) => {
          const completedTasksCount = goal.tasks.filter(
            (task) => task.isCompleted
          ).length;

          return (
            <div
              key={goal._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              {/* Goal Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {goal.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2 my-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 ${
                        goal.priority.toLowerCase() === "high"
                          ? "bg-red-300 text-red-800"
                          : goal.priority.toLowerCase() === "medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {goal.priority}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                      {goal.category}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-300 size-10 flex items-center justify-center p-2 rounded-full">
                  <button
                    onClick={() => handleDeleteAGoal(goal._id)}
                    className="font-bold text-2xl  text-red-700 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              {/* Tasks Section */}
              <div>
                <div className="flex justify-between items-center mt-4 border-b-5 mb-5 py-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    Tasks ({completedTasksCount}/{goal.tasks.length})
                  </h3>
                  <button
                    onClick={() => handleAddTaskClick(goal._id)}
                    className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 font-medium text-sm cursor-pointer"
                  >
                    + Add Task
                  </button>
                </div>

                {/* Task Input Component */}
                {showTaskInput === goal._id && (
                  <TaskInput
                    onSubmit={(title) => handleSubmit(goal._id, title)}
                    onCancel={handleCancel}
                  />
                )}

                <TaskList
                  goal={goal}
                  onToggleCompletion={toggleTaskCompletion}
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">
          No goals found. Click "Add Goal" to create one.
        </p>
      )}
    </div>
  );
};

export default GoalsList;
