import React, { useState, useEffect } from "react";
import useGenerateQuestion from "../../hooks/useGenerateQuestion";

const QuestionList = ({ topic, type }) => {
  const { questions, error } = useGenerateQuestion(topic, type);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  useEffect(() => {
    setSelectedOptions({});
    setShowAnswer({});
  }, [questions]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  if (questions.length === 0) {
    return null;
  }

  const handleOptionChange = (qIndex, option) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleShowAnswer = (qIndex) => {
    setShowAnswer((prev) => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Generated Questions:</h3>
      {questions.map((q, index) => {
        const selected = selectedOptions[index];
        const isCorrect = selected === q.correctAnswer;

        return (
          <div
            key={index}
            className="mb-6 p-4 border rounded-md shadow-sm bg-white"
          >
            <p className="font-medium">
              {index + 1}. {q.questionText}
            </p>
            {q.options && q.options.length > 0 && (
              <ul className="list-none mt-2">
                {q.options.map((option, optIndex) => (
                  <li key={optIndex} className="mb-1">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={selected === option}
                        onChange={() => handleOptionChange(index, option)}
                        className="accent-indigo-600"
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {selected && (
              <p
                className={`mt-2 font-medium ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct! Well done." : " Wrong! Try again."}
              </p>
            )}

            <button
              onClick={() => handleShowAnswer(index)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Show Answer
            </button>

            {showAnswer[index] && (
              <p className="mt-1 text-sm text-indigo-700">
                Correct Answer: {q.correctAnswer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;
