import React from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../assets/data.json'; // Ensure this is available
import './Result.css'; // Import your CSS file

const Result = () => {
  const navigate = useNavigate();

  const storedAnswers = localStorage.getItem('userAnswers');
  let userAnswers = {};
  try {
    userAnswers = storedAnswers ? JSON.parse(storedAnswers) : {};
  } catch (error) {
    console.error('Failed to parse userAnswers:', error);
    userAnswers = {};
  }

  // Check if there are no answers
  const noResults = Object.keys(userAnswers).length === 0 || Object.values(userAnswers).every(section => section.length === 0);

  // Calculate total number of questions from questionsData
  const totalQuestions = questionsData.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );

  let correctCount = 0;
  const results = !noResults ? questionsData.sections.map((section, sectionIndex) => {
    return {
      sectionTitle: `Section ${sectionIndex + 1}`,
      questions: section.questions.map((question, questionIndex) => {
        const userAnswer = userAnswers[sectionIndex]?.[questionIndex]?.answer;
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
          correctCount++;
        }
        return {
          questionText: question.question,
          options: question.options || [],
          answer: correctAnswer,
          userAnswer,
          isCorrect,
        };
      })
    };
  }) : [];

  const handleBackToHome = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="result-container">
      <h1>Quiz Results</h1>
      {noResults ? (
        <p className="no-results-message">No results found. Please take the quiz first.</p>
      ) : (
        <>
          <div className="score-container">
            <div className="circle">
              <span>{Math.round((correctCount / totalQuestions) * 100)}%</span>
            </div>
          </div>
          <p>
            Score: {correctCount} / {totalQuestions}
          </p>

          {results.map((section, sectionIndex) => (
            <div key={sectionIndex} className="result-section">
              <h2>{section.sectionTitle}</h2>
              {section.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className={`result-question ${question.isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <p>
                    <strong>
                      Q{questionIndex + 1}: {question.questionText}
                    </strong>
                  </p>
                  <div className="options">
                    {question.options.map((option, optionIndex) => {
                      let optionClass = '';
                      if (option === question.answer) {
                        optionClass = 'correct-option'; // Correct option (green)
                      } else if (option === question.userAnswer || question.userAnswer === null) {
                        optionClass = 'incorrect-option'; // Incorrect option (red) or null
                      }
                      return (
                        <div
                          key={optionIndex}
                          className={`option ${optionClass}`}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                  {question.userAnswer === null && (
                    <p className="no-answer-message">No answer provided</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default Result;
