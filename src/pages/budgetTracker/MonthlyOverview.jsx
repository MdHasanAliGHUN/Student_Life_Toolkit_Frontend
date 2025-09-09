
import useBudgetTracker from "../../hooks/useBudgetTracker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const MonthlyOverview = () => {
    
  const { transactions } = useBudgetTracker();

  const monthlyData = transactions.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (curr.type === "income") {
      acc[month].income += Number(curr.amount);
    } else {
      acc[month].expense += Number(curr.amount);
    }
    return acc;
  }, {});

  const chartData = Object.values(monthlyData);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Monthly Overview</h2>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#4CAF50" />
        <Bar dataKey="expense" fill="#F44336" />
      </BarChart>
    </div>
  );
};

export default MonthlyOverview;
