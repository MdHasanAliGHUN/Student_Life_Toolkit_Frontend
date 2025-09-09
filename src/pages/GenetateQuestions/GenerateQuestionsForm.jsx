import { useForm } from "react-hook-form";
import useGenerateQuestion from "../../hooks/useGenerateQuestion";

const GenerateQuestionsForm = () => {
  const { generateQuestions, error } = useGenerateQuestion();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const questions = await generateQuestions(data);
    if (questions) {
      console.log("Questions received in Form:", questions);
    }
  };

  return (
    <div className="mt-10 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-400">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6">
        Generate New Questions
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-7"
      >
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            {...register("subject", { required: "Subject is required!" })}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Subject</option>
            <option value="JavaScript">JavaScript</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            {...register("topic", { required: "Topic is required!" })}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Topic</option>
            <option value="Variables">Variables</option>
            <option value="Loops">Loops</option>
            <option value="Functions">Functions</option>
            <option value="OOP">OOP</option>
            <option value="Array & List">Array & List</option>
          </select>
          {errors.topic && (
            <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
          )}
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Type
          </label>
          <select
            {...register("type", { required: "Question type is required!" })}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Type</option>
            <option value="mcq">MCQ</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            {...register("difficulty", { required: "Difficulty is required!" })}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm mt-1">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            {...register("number", {
              required: "Number of questions is required!",
              min: { value: 1, message: "Minimum 1 question required" },
              max: {
                value: 5,
                message:
                  "You can only request a maximum of 5 questions at a time.",
              },
            })}
            placeholder="Enter number"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
          >
            Generate Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuestionsForm;
