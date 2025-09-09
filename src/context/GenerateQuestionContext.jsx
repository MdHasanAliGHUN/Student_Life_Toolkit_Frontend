import React, { createContext, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
export const GenerateQuestionContext = createContext(null);
const GenerateQuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestions = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/generated-question/exam-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        setQuestions(result.questions);
        console.log("Fetched Questions:", result.questions);
        return result.questions;
      } else {
        setError(result.message);
        setQuestions([]);
        return null;
      }
    } catch (err) {
      setError(
        "প্রশ্ন জেনারেট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = { isLoading, error, generateQuestions, questions };

  return (
    <GenerateQuestionContext.Provider value={value}>
      {children}
    </GenerateQuestionContext.Provider>
  );
};

export default GenerateQuestionProvider;
