import { FaRegClock, FaMoneyBillAlt, FaChartLine } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import useClassShedule from "../../hooks/useClassShedule";
import useBudgetTracker from "../../hooks/useBudgetTracker";
import useStudyPlanner from "../../hooks/useStudyPlanner";
import HeroBanner from "./HeroBanner";

const DashboardHome = () => {
  const { loading, todayClasses } = useClassShedule();
  const { totals } = useBudgetTracker();
  const { totalCompletedTasks, goals } = useStudyPlanner();

  const dashboardSummary = [
    {
      value: loading ? (
        <div className="w-5 h-5 border-b-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      ) : (
        todayClasses?.length
      ),
      label: "Classes Today",
      icon: FaRegClock,
      color: "#007bff",
    },
    {
      value: loading ? (
        <div className="w-5 h-5 border-b-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      ) : (
        `${totals?.usedPercentage}%`
      ),
      label: "Budget Used",
      icon: FaMoneyBillAlt,
      color: "#28a745",
    },
    {
      value: loading ? (
        <div className="w-5 h-5 border-b-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      ) : (
        goals?.length
      ),
      label: "Total Goals",
      icon: AiOutlineCheckCircle,
      color: "#007bff",
    },
    {
      value: loading ? (
        <div className="w-5 h-5 border-b-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      ) : (
        totalCompletedTasks
      ),
      label: "Tasks Done",
      icon: AiOutlineCheckCircle,
      color: "#17a2b8",
    },
  ];

  return (
    <div className="px-6 py-5 space-y-5">
      <HeroBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {dashboardSummary.map((data, index) => {
          const Icon = data.icon;
          return (
            <div
              key={index}
              className="rounded-md  px-6 py-7 md:py-10 flex items-center justify-between bg-white border-3 border-gray-300 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <div className="space-y-3">
                <div className="text-2xl font-bold  flex items-center gap-2">
                  {data.value}
                </div>
                <p className="text-sm md:text-lg ">{data.label}</p>
              </div>

              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: data.color, color: "#fff" }}
              >
                <Icon className="text-xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
