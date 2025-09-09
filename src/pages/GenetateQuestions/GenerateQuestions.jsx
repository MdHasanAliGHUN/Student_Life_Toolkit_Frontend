import React from "react";
import GenerateQuestionsForm from "./GenerateQuestionsForm";
import useGenerateQuestion from "../../hooks/useGenerateQuestion";
import QuestionList from "./QuestionList";

const GenerateQuestions = () => {
  return (
    <div className="p-6">
      <div
        className=" mb-6 w-full p-10 
        bg-gradient-to-r from-teal-900 to-blue-800
        text-white
        rounded-lg
        shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-3">Exam Q&A Generator</h1>
        <p className="text-sm capitalize">
          Generate practice questions and build your Review Bank
        </p>
      </div>

      <div>
        <GenerateQuestionsForm />
      </div>
      <div>
        <QuestionList />
      </div>
    </div>
  );
};

export default GenerateQuestions;
