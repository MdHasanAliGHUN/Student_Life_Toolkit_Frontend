import React from "react";
import { useContext } from "react";
import { StudyPlannerContext } from "../context/StudyPlannerContext";

const useStudyPlanner = () => {
  const context = useContext(StudyPlannerContext);
  if (!context) {
    throw new Error(
      "useStudyPlanner must be used within a StudyPlannerProvider"
    );
  }
  return context;
};

export default useStudyPlanner;
