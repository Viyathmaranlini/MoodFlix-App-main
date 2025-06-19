import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: "What kind of energy do you want in a movie today?",
    options: [
      "🔥 High action and excitement",
      "😌 Calm and relaxing",
      "🧠 Thought-provoking and deep",
      "😂 Light and funny",
      "❤️ Emotional and romantic",
    ],
  },
  {
    id: 2,
    text: "Do you want to watch something…",
    options: [
      "🎭 Dramatic",
      "🎬 Realistic or based on true events",
      "🚀 Fantastical or imaginative",
      "👻 Spooky or thrilling",
      "👪 Family-friendly",
    ],
  },
  {
    id: 3,
    text: "What kind of ending do you prefer right now?",
    options: [
      "🥰 Feel-good and happy",
      "😲 Shocking or unexpected",
      "😢 Bittersweet or emotional",
      "😎 Cool and satisfying",
      "🤔 Open-ended or mysterious",
    ],
  },
  {
    id: 4,
    text: "What comes closest to your occasion?",
    options: [
      "🎉 Hanging out with friends",
      "💑 Date night / Romantic mood",
      "🧘‍♂️ Chilling alone / Me-time",
      "👨‍👩‍👧‍👦 Family movie time",
      "😌 Winding down after a long day",
      "🍿 Looking for something new or different",
      "😔 Need a mood boost / Feeling low",
      "🎮 Background noise while doing something else",
    ],
  },
];

const QAPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionSelect = (option) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };
    
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/recommendation', { state: { answers: newAnswers } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 font-sans text-white bg-gradient-to-tr from-purple-900 via-indigo-900 to-black md:p-12">
      <div className="w-full max-w-lg p-8 bg-gray-900 border border-purple-700 shadow-2xl bg-opacity-90 rounded-3xl backdrop-blur-lg">
        
        {/* Progress Bar */}
        <div className="w-full h-3 mb-8 overflow-hidden bg-gray-700 rounded-full shadow-inner">
          <div 
            className="h-full transition-all duration-500 ease-in-out rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 className="mb-10 text-3xl font-extrabold leading-snug text-center drop-shadow-lg">
          {currentQuestion.text}
        </h2>

        {/* Options */}
        <div className="space-y-5">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="group flex items-center w-full rounded-xl bg-gradient-to-tr from-gray-800 via-gray-900 to-black shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none transition-transform transform hover:scale-[1.03] focus:scale-[1.03] p-5"
              aria-label={`Answer option: ${option}`}
            >
              <span className="mr-6 text-4xl">{option.split(' ')[0]}</span>
              <span className="text-lg font-semibold tracking-wide select-none">
                {option.split(' ').slice(1).join(' ')}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 text-sm text-gray-400 select-none">
          <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="text-purple-400 transition-colors hover:text-purple-300"
            >
              ← Previous
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QAPage;
