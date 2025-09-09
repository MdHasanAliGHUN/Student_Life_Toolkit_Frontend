import { useContext } from "react";
import { BudgetTrackerContext } from "../context/BudgetTrackerContext";

const useBudgetTracker = () => {
  const context = useContext(BudgetTrackerContext);
  if(!context){
    throw new Error("Hook must be used within BudgetTrackerProvider")
  }
  return context
};

export default useBudgetTracker;
