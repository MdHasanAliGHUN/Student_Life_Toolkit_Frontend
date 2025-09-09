import React, { useState } from "react";
import AddClassForm from "./AddClassForm";
import TodayClasses from "./TodayClasses";
import ClassesByDay from "./ClassesByDay";

const ClassSchedule = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8">
      <div
        className="flex justify-between items-center mb-6 w-full p-10 
        bg-gradient-to-r from-blue-900 to-teal-500 text-white
        rounded-lg
        shadow-lg
        "
      >
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Class Schedule
          </h1>
          <p className="text-md text-white">Manage your class timetable</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          + Add Class
        </button>
      </div>

      {/* Form  Modal */}
      {showModal && (
        <AddClassForm showModal={showModal} setShowModal={setShowModal} />
      )}

      {/* Today Classes */}
      <TodayClasses />
      <ClassesByDay />
    </div>
  );
};

export default ClassSchedule;
