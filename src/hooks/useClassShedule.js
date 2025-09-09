import { useContext } from "react";
import { ClassSheduleContext } from "../context/ClassSheduleContext";

const useClassShedule = () => {
  const context = useContext(ClassSheduleContext);

  if (!context) {
    throw new Error("Hook must be used within ClassSheduleProvider");
  }

  return context;
};

export default useClassShedule;
