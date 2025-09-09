// ClassesByDay.jsx (Updated)
import React, { useState, useEffect } from "react";
import { daysOfWeek } from "../../constants/daysOfWeek";
import useClassShedule from "../../hooks/useClassShedule";
import DayClassesList from "./DayClassesList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ClassesByDay = () => {
  const { allClasses } = useClassShedule();
  const [activeDay, setActiveDay] = useState("Saturday");
  const [classesForActiveDay, setClassesForActiveDay] = useState([]);

  useEffect(() => {
    if (allClasses) {
      const filteredClasses = allClasses.filter(
        (cls) => cls.day.toLowerCase() === activeDay.toLocaleLowerCase()
      );
      setClassesForActiveDay(filteredClasses);
    }
  }, [allClasses, activeDay]);

  return (
    <div className="p-7 bg-white rounded-xl border border-gray-200 mt-10">
      <div className="bg-gray-100 py-3 px-5 rounded-sm mb-6 flex flex-wrap justify-between">
        {daysOfWeek.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 cursor-pointer
              ${
                activeDay === day
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Content section */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Classes for <span className="text-blue-600">{activeDay}</span>
        </h2>

        <DayClassesList classesForActiveDay={classesForActiveDay} />
      </div>
    </div>
  );
};

export default ClassesByDay;
