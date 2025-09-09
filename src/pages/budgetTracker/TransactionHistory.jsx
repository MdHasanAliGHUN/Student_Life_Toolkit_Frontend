import React, { useState } from "react";
import useBudgetTracker from "../../hooks/useBudgetTracker";

const TransactionHistory = () => {
  const { transactions } = useBudgetTracker();
  const [showLimitedTransaction, setShowLimitedTransaction] = useState(5);

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const visibleTransactions = sortedTransactions.slice(
    0,
    showLimitedTransaction
  );

  return (
    <div className="p-10 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Transactions History</h1>
      <p className="text-gray-500 mb-4">Your latest income and expenses</p>

      <div className="space-y-4">
        {visibleTransactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet</p>
        ) : (
          visibleTransactions.map((tx) => {
            const date = new Date(tx.createdAt);
            return (
              <div
                key={tx._id}
                className="flex justify-between items-center p-4 rounded border border-gray-300"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.category} ({tx.type})
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {date.toLocaleDateString()} | Time:{" "}
                    {date.toLocaleTimeString()}
                  </p>
                </div>

                {/* Right side: Amount */}
                <p
                  className={`font-bold text-lg ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "income" ? " + " : " - "}
                  {tx.amount}
                </p>
              </div>
            );
          })
        )}
      </div>

      {showLimitedTransaction < sortedTransactions.length && (
        <div className="flex items-center justify-center my-7">
          <button
            onClick={
              () => setShowLimitedTransaction((prev) => prev + 5)
            }
            className="bg-gray-200 hover:bg-white px-6 py-3 rounded-md text-sm font-semibold border border-gray-300 transition-all duration-300 ease-in-out cursor-pointer italic"
          >
            View More Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
