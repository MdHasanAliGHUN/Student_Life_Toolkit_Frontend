import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";

export const ClassSheduleContext = createContext(null);

const ClassSheduleProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadData, setReloadData] = useState(0);
  const [reloadAllDays, setReloadAllDays] = useState(0)

  /*********************************************/
  const [todayClasses, setTodayClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  //ADD A NEW CLASS IN THE SCHEDULE
  const addANewClass = async (classData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/class/add-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error("Failed to add class");
      }

      const responseData = await response.json();
      setReloadData((pre) => pre + 1);
      return responseData;
    } catch (err) {
      console.error("Error adding class:", err);
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //GET ALL CLASSES
  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/class/get-all-classes`);
        if (!response.ok) {
          throw new Error("Failed to fetch all classes");
        }
        const data = await response.json();
        setAllClasses(data.classes);
      } catch (error) {
        console.error("Error fetching all classes:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchAllClasses();
  }, [reloadData, reloadAllDays]);

  //GET ALL TODAY'S CLASSES
  useEffect(() => {
    const getTodaysClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/class/get-today-classes`);

        if (!response.ok) {
          throw new Error("Failed to fetch today's classes"); // simple error
        }

        const data = await response.json(); // JSON data parse
        setTodayClasses(data.todaysClasses);
      } catch (error) {
        setError(error.message || "Something went wrong"); // error variable ঠিকভাবে ব্যবহার
      } finally {
        setLoading(false);
      }
    };
    getTodaysClasses();
  }, [reloadData]);

  //DELETE A CLASS FROM SHEDULE BY ID
  const deleteSpecificClassById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/class/delete-class/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the class");
      }
      const data = await response.json();
      setReloadAllDays((pre) => pre + 1);
      return data;
    } catch (error) {
      console.error("Error deleting class:", error);
      setError(error.message || "Something went wrong");
      throw error;
    }
  };

  const classSheduleData = {
    loading,
    error,
    reloadData,
    todayClasses,
    allClasses,
    setTodayClasses,
    addANewClass,
    deleteSpecificClassById,
  };

  return (
    <ClassSheduleContext.Provider value={classSheduleData}>
      {children}
    </ClassSheduleContext.Provider>
  );
};

export default ClassSheduleProvider;
