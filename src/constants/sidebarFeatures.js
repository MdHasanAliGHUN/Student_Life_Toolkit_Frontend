import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCalendarAlt, FaPiggyBank } from "react-icons/fa";
import { MdOutlineMenuBook, MdQuiz, MdOutlineStickyNote2} from "react-icons/md";

const sidebarsFeatures = [
  {
    label: "Dashboard",
    icon: AiOutlineDashboard,
    path: "/",
  },
  {
    label: "Class Schedule",
    icon: FaRegCalendarAlt,
    path: "/class-schedule",
  },
  {
    label: "Budget Tracker",
    icon: FaPiggyBank,
    path: "/budget-tracker",
  },
  {
    label: "Study Planner",
    icon: MdOutlineMenuBook,
    path: "/study-planner",
  },
  {
    label: "Exam Q&A",
    icon: MdQuiz,
    path: "/exam-qa",
  },
 
];

export default sidebarsFeatures;
