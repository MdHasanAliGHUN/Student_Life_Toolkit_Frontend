import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";

export const BudgetTrackerContext = createContext(null);

const BudgetTrackerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

  /***************************************/
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({totalIncome: 0,totalExpense: 0,balance: 0, usedPercentage : 0});

  // ADD A NEW TRANSACTION TO THE DATABASE
  const addNewTransaction = async (transactionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/badget-tracker/add-transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        }
      );
      if (!response.ok) {
        throw new Error(data.message || "Failed to add transaction");
      }
      const data = await response.json();
      setReload((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //GET ALL TRANSACTIONS FROM THE DATABASE
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${BASE_URL}/badget-tracker/all-transactions`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data.transactions);
        setTotals(data.totals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllTransactions();
  }, [reload]);

  const budgetTrackerData = {
    loading,
    error,
    addNewTransaction,
    transactions,
    totals, 
  };
  return (
    <BudgetTrackerContext.Provider value={budgetTrackerData}>
      {children}
    </BudgetTrackerContext.Provider>
  );
};

export default BudgetTrackerProvider;
