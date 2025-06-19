import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../hooks/useRecommendation';
import { useSelector } from 'react-redux';
import WebcamMoodDetection from './WebcamMoodDetection';

const MoodDetectionPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [webcamActive, setWebcamActive] = useState(false);
  const { fetchRecommendations } = useRecommendation();
  const [mood, setMood] = useState(null);
  useSelector((state) => state.movieo);
  const navigate = useNavigate();

  const questions = [
    // Add your quiz questions here
  ];

  const mapAnswersToFilters = (answers) => {
    const filters = {};
    const genreMap = {
      "😊 Happy": 35,
      "😢 Sad": 18,
      "😠 Angry": 28,
      "😰 Stressed": 10749,
      "😴 Bored": 878,
    };

    if (answers[0]) {
      const genreId = genreMap[answers[0]];
      if (genreId) filters.with_genres = genreId;
    }
    return filters;
  };

  const handleAnswer = async (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const filters = mapAnswersToFilters(newAnswers);
      const recommendations = await fetchRecommendations(filters);

      if (recommendations.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(5, recommendations.length));
        navigate(`/details/${recommendations[randomIndex].id}`);
      } else {
        navigate('/no-results');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 font-sans text-white bg-gradient-to-tr from-purple-900 via-indigo-900 to-black">
      <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 drop-shadow-lg">
        Detect Your Mood
      </h1>

      {!showQuiz && !webcamActive ? (
        <div className="w-full max-w-lg p-8 border border-purple-700 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl">
          <p className="mb-6 text-lg text-center text-gray-300 md:text-xl">
            Use your webcam or answer a few questions to detect your mood.
          </p>

          <div className="flex flex-col space-y-5">
            <button
              onClick={() => setWebcamActive(true)}
              className="px-6 py-3 text-lg font-semibold transition-transform transform bg-pink-600 rounded-full shadow-lg hover:bg-pink-700 active:bg-pink-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400"
            >
              Start Mood Detection (Webcam)
            </button>

            <button
              onClick={() => setShowQuiz(true)}
              className="px-6 py-3 text-lg font-semibold transition-transform transform bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 active:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            >
              Take Mood Quiz
            </button>
          </div>
        </div>
      ) : webcamActive ? (
        <div className="w-full max-w-4xl p-4 bg-gray-900 border border-purple-700 shadow-lg rounded-xl">
          <WebcamMoodDetection />
          <button
            onClick={() => setWebcamActive(false)}
            className="px-5 py-2 mt-6 font-semibold transition-shadow bg-red-600 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500"
          >
            Stop Webcam
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg p-8 border border-indigo-700 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl">
          <h2 className="mb-8 text-3xl font-bold tracking-wide text-center">
            Movie Recommendation Quiz
          </h2>
          {/* Insert quiz content and answer buttons here */}
          {/* Example quiz question */}
          <p className="mb-6 text-lg text-gray-300">Question: {questions[currentQuestion]}</p>
          {/* Example answer buttons */}
          {/* map answers here and use handleAnswer onClick */}
        </div>
      )}
    </div>
  );
};

export default MoodDetectionPage;
