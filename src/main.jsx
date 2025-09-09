import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import ClassSheduleProvider from "./context/ClassSheduleContext";
import BudgetTrackerProvider from "./context/BudgetTrackerContext";
import StudyPlannerProvider from "./context/StudyPlannerContext";
import GenerateQuestionProvider from "./context/GenerateQuestionContext";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GenerateQuestionProvider>
      <StudyPlannerProvider>
        <BudgetTrackerProvider>
          <ClassSheduleProvider>
            <AppRoutes />
          </ClassSheduleProvider>
        </BudgetTrackerProvider>
      </StudyPlannerProvider>
    </GenerateQuestionProvider>
  </BrowserRouter>
);
