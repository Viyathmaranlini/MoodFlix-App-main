import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';

const WebcamMoodDetection = () => {
  const videoRef = useRef();
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(true);
  const [webcamLoading, setWebcamLoading] = useState(true);
  const navigate = useNavigate();

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    setLoading(false);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setWebcamLoading(false);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
        setWebcamLoading(false);
      });
  };

  const detectMood = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detection && detection.expressions) {
      const expressions = detection.expressions;
      const topMood = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setMood(topMood);
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectMood();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRecommend = () => {
    navigate(`/mood-result/${mood}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-800">
      <h1 className="mb-4 text-3xl font-bold">Webcam Mood Detection</h1>
      {loading ? <p>Loading models...</p> : null}
      {webcamLoading ? <p>Initializing webcam...</p> : null}
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        className="mb-4 rounded-md"
      />
      <p>Detected Mood: <strong>{mood || 'No mood detected yet'}</strong></p>
      <button
        className="px-4 py-2 mt-4 bg-gray-600 rounded-md hover:bg-red-800"
        onClick={handleRecommend}
        disabled={!mood}
      >
        Recommend a Movie
      </button>
    </div>
  );
};

export default WebcamMoodDetection;