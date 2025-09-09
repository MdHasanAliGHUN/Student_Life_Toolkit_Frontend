import weekDays from "../../constants/weekDays";
import typeOfClass from "../../constants/typeOfClass";
import { useForm } from "react-hook-form";
import useClassShedule from "../../hooks/useClassShedule";

const AddClassForm = ({ setShowModal }) => {
  const { addANewClass, loading, error } = useClassShedule();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addANewClass(data);
      alert("Class added successfully!");
      reset();
      setShowModal(false);
    } catch (err) {
      alert("Error adding class. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-10 z-10">
        <div>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Add New Class
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter the details for your new class
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Subject Name
            </label>
            <input
              {...register("subject", { required: true })}
              type="text"
              placeholder="Enter Subject Name"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.subjectName && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Professor
            </label>
            <input
              {...register("professor", { required: true })}
              type="text"
              placeholder="e.g., Dr. Smith"
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.professor && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Time
              </label>
              <input
                {...register("time", { required: true })}
                type="text"
                placeholder="e.g., 09:00 - 10:30"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.time && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="Enter Room Number"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Day
              </label>
              <select
                {...register("day", { required: true })}
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  {" "}
                  Select a day
                </option>
                {weekDays.map((day, index) => (
                  <option key={index} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
              {errors.day && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Class Type
              </label>
              <select
                {...register("classType", { required: true })}
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select class type
                </option>
                {typeOfClass.map((type, index) => (
                  <option key={index} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.classType && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-10 py-2 rounded-sm shadow-md hover:bg-blue-600 transition-colors"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;
