const Quiz = ({ questions, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
  
    const handleAnswer = (questionId, answerId) => {
      setAnswers({
        ...answers,
        [questionId]: answerId
      });
    };
  
    const handleSubmit = () => {
      if (onComplete) {
        onComplete(answers);
      }
    };
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
              >
                <input
                  type="radio"
                  checked={answers[questions[currentQuestion].id] === option.id}
                  onChange={() => {}}
                  className="mr-2"
                />
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation buttons */}
      </div>
    );
  };