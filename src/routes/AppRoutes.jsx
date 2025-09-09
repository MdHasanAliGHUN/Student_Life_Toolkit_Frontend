import { Route, Routes } from "react-router";
import App from "../App";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ClassSchedule from "../pages/classSchedule/ClassSchedule";
import BudgetTracker from "../pages/budgetTracker/BudgetTracker";
import StudyPlanner from "../pages/studyPlanner/StudyPlanner";
import GenerateQuestions from "../pages/GenetateQuestions/GenerateQuestions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/class-schedule" element={<ClassSchedule />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="/exam-qa" element={<GenerateQuestions />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
