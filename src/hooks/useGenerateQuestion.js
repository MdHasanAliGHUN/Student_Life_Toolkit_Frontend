import React, { useContext } from 'react';
import { GenerateQuestionContext } from '../context/GenerateQuestionContext';

const useGenerateQuestion = () => {
    const context = useContext(GenerateQuestionContext)
    if(!context){
        throw new Error("Hook must be used within ClassSheduleProvider")
    }
    return context
};

export default useGenerateQuestion;