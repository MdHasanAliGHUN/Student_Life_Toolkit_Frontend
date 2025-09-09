import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useBudgetTracker from "../../hooks/useBudgetTracker";

const ExpenseBreakdown = () => {
  const { transactions } = useBudgetTracker();

  const expensesByCategory = {};
  
  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!expensesByCategory[t.category]) {
        expensesByCategory[t.category] = 0;
      }
      expensesByCategory[t.category] += Number(t.amount);
    }
  });

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5A5F"];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Expense Breakdown</h2>

      {chartData.length === 0 ? (
        <p className="text-gray-400 text-center">No expenses yet</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"   
            nameKey="name"  
            cx="50%"       
            cy="50%"      
            outerRadius={100} 
            label            
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />  
          <Legend />  
        </PieChart>
      )}
    </div>
  );
};

export default ExpenseBreakdown;
