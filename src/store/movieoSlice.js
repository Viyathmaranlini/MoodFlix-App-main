import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bannerData: [],
  imageURL: "",
  recommendations: [],
  recommendationLoading: false,
  moviesByGenre: [], // Added new state property
  loading: false, // Added loading state for async actions
};

// Async thunk to fetch movies by genre
export const fetchMoviesByGenre = createAsyncThunk(
  'movieo/fetchMoviesByGenre',
  async (genreName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          with_genres: getGenreId(genreName), // Replace with your genre mapping logic
          sort_by: 'popularity.desc',
          page: 1,
        },
      });
      return response.data.results.filter(movie => movie.poster_path); // Return filtered movies
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const movieoSlice = createSlice({
  name: 'movieo',
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setRecommendationLoading: (state, action) => {
      state.recommendationLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesByGenre = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to fetch movies by genre:", action.payload);
      });
  },
});

export const { setBannerData, setImageURL, setRecommendations, setRecommendationLoading } = movieoSlice.actions;

export default movieoSlice.reducer;

// Helper function to map genre names to TMDB genre IDs
const getGenreId = (genreName) => {
  const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    "Sci-Fi": 878,
    // Add more genres as needed
  };
  return genreMap[genreName] || null;
};