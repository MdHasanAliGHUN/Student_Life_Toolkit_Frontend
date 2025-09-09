import { useForm } from "react-hook-form";
import { incomeCategories } from "../../constants/incomeCategories";
import {expenseCategories} from "../../constants/expenseCategories"
import useBudgetTracker from "../../hooks/useBudgetTracker";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useState } from "react";

const AddTransaction = ({ setShowModal }) => {
  const { addNewTransaction, loading, error } = useBudgetTracker();
  const [transactionType, setTransactionType] = useState("");
  console.log(transactionType);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addNewTransaction(data);
      reset();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error}/>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-8 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Add Transaction</h1>
            <p className="text-sm text-gray-500">
              Record a new income or expense
            </p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Transaction Type
            </label>
            <select
              {...register("type", {
                required: "Transaction type is required",
              })}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
              defaultValue=""
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              defaultValue=""
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select Category
              </option>
              {(transactionType === "income"
                ? incomeCategories
                : expenseCategories
              ).map((category, index) => (
                <option key={index} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: "Amount is required" })}
              className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 outline-none border-none cursor-pointer py-2 rounded-lg shadow-md transition-all"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
