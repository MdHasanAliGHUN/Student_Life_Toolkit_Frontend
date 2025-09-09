import React from "react";

const BudgetTrackerCard = ({ cartData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cartData.map((item, index) => (
        <div
          key={index}
          className="flex items-center border border-gray-400 rounded-md shadow-sm px-6 py-4 min-h-28"
        >
          <div className={`${item.bg} p-2 md:p-4 rounded-md`}>{item.icon}</div>
          <div className="ml-4">
            <h2 className={`text-xl font-bold ${item.color}`}>{item.amount}</h2>
            <p className="text-gray-600">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetTrackerCard;
