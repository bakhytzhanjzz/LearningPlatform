import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ quiz, lessonId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousAttempts, setPreviousAttempts] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/lessons/${lessonId}/quiz-progress`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        setPreviousAttempts(response.data.attempts || []);
        const hasPassed = response.data.attempts?.some(attempt => attempt.score >= 70);
        setPassed(hasPassed);
        
        const bestAttempt = response.data.attempts?.reduce((best, current) => 
          (current.score > best.score) ? current : best, { score: 0 });
        setBestScore(bestAttempt.score);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz progress:', err);
        setLoading(false);
      }
    };

    fetchQuizProgress();
  }, [lessonId]);

  if (loading) {
    return <div className="text-center">Loading quiz data...</div>;
  }

  if (passed) {
    return (
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Quiz Completed Successfully!</h3>
        <p className="text-green-600 mb-4">
          You have already passed this quiz with a best score of {bestScore}%.
        </p>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Your previous attempts:</h4>
          {previousAttempts.map((attempt, index) => (
            <div key={index} className="text-sm text-gray-600 mb-1">
              Attempt {index + 1}: Score {attempt.score}% 
              ({new Date(attempt.attemptDate).toLocaleDateString()})
              {attempt.score >= 70 && " ✅"}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId: parseInt(questionId),
        selectedAnswer: parseInt(selectedAnswer)
      }));

      const response = await axios.post(
        `http://localhost:5000/api/courses/lessons/${lessonId}/submit-quiz`,
        { answers: formattedAnswers },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setPassed(response.data.score >= 70);
      setBestScore(Math.max(bestScore, response.data.score));
      setPreviousAttempts([...previousAttempts, {
        score: response.data.score,
        attemptDate: new Date(),
      }]);

      if (response.data.score >= 70) {
        alert(`Congratulations! You passed with score ${response.data.score}%`);
      } else {
        alert(`Your score is ${response.data.score}%. You need 70% to pass. Try again!`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError(err.response?.data?.message || 'Error submitting quiz answers');
    } finally {
      setLoading(false);
    }
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>No quiz available</div>;
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h3>
          </div>
          
          <p className="text-lg mb-4">{currentQ.question}</p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center p-3 border rounded cursor-pointer transition-colors ${
                  answers[currentQ.questionId] === index
                    ? 'bg-blue-50 border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleAnswerSelect(currentQ.questionId, index)}
              >
                <input
                  type="radio"
                  checked={answers[currentQ.questionId] === index}
                  onChange={() => {}}
                  className="mr-3"
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => 
                Math.min(quiz.questions.length - 1, prev + 1)
              )}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Questions answered: {Object.keys(answers).length}/{quiz.questions.length}
            </span>
            <span>
              Progress: {Math.round((Object.keys(answers).length / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.keys(answers).length / quiz.questions.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;