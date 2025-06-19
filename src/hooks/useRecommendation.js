// src/hooks/useRecommendation.js
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRecommendations } from '../store/movieoSlice';

export const useRecommendation = () => {
  const dispatch = useDispatch();

  const fetchRecommendations = async (filters) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          language: 'en-US',
          ...filters
        }
      });
      dispatch(setRecommendations(response.data.results));
      return response.data.results;
    } catch (error) {
      console.error("Recommendation error:", error);
      return [];
    }
  };

  return { fetchRecommendations };
};