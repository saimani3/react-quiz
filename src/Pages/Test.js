import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../assets/data.json'; 
import './Test.css'; // Import your CSS file

const Test = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(() => {
    // Load answers from local storage if available
    const storedAnswers = localStorage.getItem('userAnswers');
    return storedAnswers ? JSON.parse(storedAnswers) : {};
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    // Load remaining time from local storage if available
    const storedTime = localStorage.getItem('timeLeft');
    return storedTime ? JSON.parse(storedTime) : 120 * 60; // 120 minutes in seconds
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/result');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        // Save the remaining time in local storage
        localStorage.setItem('timeLeft', JSON.stringify(newTimeLeft));
        return newTimeLeft;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const handleAnswerChange = (option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [currentSection]: {
          ...prevAnswers[currentSection],
          [currentQuestion]: {
            answer: option || null, // Save as null if no option is selected
            question: questionsData.sections[currentSection].questions[currentQuestion].question,
          },
        },
      };
      // Save answers in local storage
      localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  }

  const handleNext = () => {
    // Save current question's answer as null if no option is selected
    if (!answers[currentSection]?.[currentQuestion]?.answer) {
      handleAnswerChange(null);
    }

    if (currentQuestion < questionsData.sections[currentSection].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSection < questionsData.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      navigate('/result');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      setCurrentQuestion(questionsData.sections[currentSection - 1].questions.length - 1);
    }
  };

  const handleSubmit = () => {
    // Save final answers in local storage
    localStorage.setItem('userAnswers', JSON.stringify(answers));
    navigate('/result');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const section = questionsData.sections[currentSection];
  const question = section.questions[currentQuestion];

  return (
    <div className="test-container">
      <header className="test-header">
        <h1>{section.title}</h1>
        <p className="timer">Time left: {formatTime(timeLeft)}</p>
      </header>
      <div className="question-container">
        <div className="question-content">
          <p className="question-text">
            {currentQuestion + 1}. {question.question}
          </p>
          {question.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`${currentQuestion}-${index}`}
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentSection]?.[currentQuestion]?.answer === option}
                onChange={() => handleAnswerChange(option)}
              />
              <label htmlFor={`${currentQuestion}-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button
          className="previous-button"
          onClick={handlePrevious}
          disabled={currentSection === 0 && currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={
            currentSection === questionsData.sections.length - 1 &&
            currentQuestion === section.questions.length - 1
              ? handleSubmit
              : handleNext
          }
        >
          {currentSection === questionsData.sections.length - 1 &&
          currentQuestion === section.questions.length - 1
            ? 'Submit'
            : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Test;
