import { FaChartLine, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import BudgetTrackerCard from "./BudgetTrackerCard";
import { useState } from "react";
import AddTransaction from "./AddTransaction";
import useBudgetTracker from "../../hooks/useBudgetTracker";
import MonthlyOverview from "./MonthlyOverview";
import ExpenseBreakdown from "./ExpenseBreakdown";
import TransactionHistory from "./TransactionHistory";
const BudgetTracker = () => {
  const [showModel, setShowModel] = useState(false);
  const { totals, loading } = useBudgetTracker();

  const cartData = [
    {
      title: "Total Income",
      amount: loading ? (
        <div className="w-5 h-5  border-2 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      ) : (
        totals?.totalIncome
      ),
      color: "text-green-600",
      bg: "bg-green-300",
      icon: <FaChartLine className="text-green-600 text-xl" />,
    },
    {
      title: "Total Expenses",
      amount: loading ? (
        <div className="w-5 h-5 border-2 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      ) : (
        totals?.totalExpense
      ),
      color: "text-red-600",
      bg: "bg-orange-100",
      icon: <FaMoneyBillWave className="text-red-600 text-xl" />,
    },
    {
      title: "Balance",
      amount: loading ? (
        <div className="w-5 h-5 border-2 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      ) : (
        totals?.balance
      ),
      color: "text-green-900",
      bg: "bg-blue-200",
      icon: <FaWallet className="text-blue-600 text-xl" />,
    },
  ];

  return (
    <div className="p-6 ">
      <div
        className="flex items-center justify-between mb-6 w-full p-10 
        bg-gradient-to-l from-teal-700 to-blue-900
        text-white
        rounded-lg
        shadow-lg
        "
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Budget Tracker</h1>
          <p>Monitor your income and expenses</p>
        </div>
        <button
          onClick={() => setShowModel(!showModel)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          + Add Transaction
        </button>
      </div>

      {/* Budget Tracker Cart*/}
      <BudgetTrackerCard cartData={cartData} />
      {showModel && <AddTransaction setShowModal={setShowModel} />}

      {/* Charts */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <MonthlyOverview />
        <ExpenseBreakdown />
      </div>

      <div className="mt-10">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default BudgetTracker;
