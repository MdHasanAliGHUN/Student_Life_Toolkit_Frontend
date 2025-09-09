import React, { useState } from "react";
import { FaPlus, FaBullseye, FaCheck, FaHourglassHalf } from "react-icons/fa";
import AddStudyPlanner from "./AddStudyPlanner";
import GoalsList from "./GoalsList";
import useStudyPlanner from "../../hooks/useStudyPlanner";

const StudyPlanner = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const { goals, loading, totalCompletedTasks, totalInProgressTasks } =
    useStudyPlanner();

  // ==============================
  // Cards Data
  // ==============================
  const cardsData = [
    {
      id: 1,
      title: "Total Goals",
      count: loading ? (
        <div className="w-4 h-4 border border-blue-700 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        goals?.length
      ),
      icon: <FaBullseye />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Completed Tasks",
      count: loading ? (
        <div className="w-4 h-4 border border-blue-700 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        totalCompletedTasks
      ),
      icon: <FaCheck />,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "In Progress",
      count: loading ? (
        <div className="w-4 h-4 border border-blue-700 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        totalInProgressTasks
      ),
      icon: <FaHourglassHalf />,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6 w-full p-10 
        bg-gradient-to-l from-teal-700 to-blue-900
        text-white
        rounded-lg
        shadow-lg
        "
      >
        <div>
          <h1 className="text-3xl font-bold">Study Planner</h1>
          <p className=" capitalize mt-1">
            Set goals and track your study progress
          </p>
        </div>

        <button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center space-x-2 mt-4 sm:mt-0 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          <FaPlus />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-gray-100 p-6 rounded-lg border border-gray-600 flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <span className={`text-2xl ${card.iconColor}`}>{card.icon}</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{card.count}</h2>
              <p className="text-gray-500">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Study Goal Modal */}
      {showGoalModal && <AddStudyPlanner setShowGoalModal={setShowGoalModal} />}

      {/* Goal List */}
      <GoalsList />
    </div>
  );
};

export default StudyPlanner;
