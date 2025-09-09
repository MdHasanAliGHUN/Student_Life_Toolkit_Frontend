import { useForm } from "react-hook-form";
import useStudyPlanner from "../../hooks/useStudyPlanner";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const AddStudyPlanner = ({ setShowGoalModal }) => {
  const { addANewGoal, loading, error } = useStudyPlanner();
  console.log(name);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addANewGoal(data);
      reset();
      setShowGoalModal(false);
    } catch (error) {
      console.error("Error submitting goal:", error);
    }
  };

  if(loading) return <Loading/>
  if(error) return <Error/>

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        onClick={() => setShowGoalModal(false)}
        className="absolute inset-0 bg-black/50"
      ></div>

      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Create Study Goal
            </h1>
            <p className="text-sm text-gray-500">
              Set a new learning objective and break it down into tasks
            </p>
          </div>
          <button
            onClick={() => setShowGoalModal(false)}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Goal Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Goal Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Goal title is required" })}
              placeholder="Enter your goal title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="flex gap-5">
            {/* Priority */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Priority
              </label>
              <select
                {...register("priority", { required: "Priority is required" })}
                className="w-full px-4 py-[10px] border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Deadline
              </label>
              <input
                type="date"
                {...register("deadline", { required: "Deadline is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              placeholder="e.g., Math, Programming, Language"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              rows="3"
              {...register("description")}
              placeholder="Write a short description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudyPlanner;
