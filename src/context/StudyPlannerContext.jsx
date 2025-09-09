import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../constants/baseURL";

export const StudyPlannerContext = createContext(null);

const StudyPlannerProvider = ({ children }) => {
  // ==============================
  // State Variables
  // ==============================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [goals, setGoals] = useState([]);
  // Calculate total completed tasks
  const totalCompletedTasks = goals.reduce((sum, goal) => {
    return sum + (goal.completedTasks || 0);
  }, 0);

  // Calculate total in-progress tasks
  const totalInProgressTasks = goals.reduce((sum, goal) => {
    const inProgress = (goal.totalTasks || 0) - (goal.completedTasks || 0);
    return sum + inProgress;
  }, 0);

  // ==============================
  // Add a New Goal
  // ==============================
  const addANewGoal = async (goalData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/study-planner/add-goal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) throw new Error("Failed to add goal");

      const data = await response.json();
      console.log("Goal Added:", data);
      setReload((prev) => prev + 1); // Trigger refetch
    } catch (error) {
      setError(error.message);
      console.error("Error adding goal:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Add a New Task
  // ==============================
  const addATask = async (goalId, taskTitle) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/study-planner/add-task/${goalId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: taskTitle }),
        }
      );

      if (!response.ok) throw new Error("Failed to add task");

      const data = await response.json();
      console.log("Task Added:", data);
      setReload((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Fetch All Goals
  // ==============================
  useEffect(() => {
    const fetchAllGoals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/study-planner/get-goals`);
        if (!response.ok) throw new Error("Failed to fetch goals");

        const data = await response.json();
        setGoals(data.goals);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGoals();
  }, [reload]);

  // ==============================
  // Update task
  // ==============================
  const toggleTaskCompletion = async (goalId, taskId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/study-planner/update-task/${goalId}/${taskId}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) throw new Error("Failed to update task");
      const data = await response.json();
      console.log("Task Updated:", data);
      setReload((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Delete a Goal
  // ==============================

  const handleDeleteGoal = async (goalId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this goal?"
      );
      if (!confirmDelete) return;
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/study-planner/delete-goal/${goalId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete goal");
      const data = await response.json();
      console.log("Goal Deleted:", data);
      setReload((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
      console.error("Error deleting goal:", error);
    } finally {
      setLoading(false);
    }
  };
  // ==============================
  // Context Value
  // ==============================
  const studyPlannerData = {
    loading,
    error,
    addANewGoal,
    goals,
    addATask,
    toggleTaskCompletion,
    handleDeleteGoal,
    totalCompletedTasks,
    totalInProgressTasks,
  };

  return (
    <StudyPlannerContext.Provider value={studyPlannerData}>
      {children}
    </StudyPlannerContext.Provider>
  );
};

export default StudyPlannerProvider;
