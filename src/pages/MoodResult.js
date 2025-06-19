import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TMDB_API_KEY = '99ac615ee13f0be588c5e904e5602336';

const moodGenres = {
  happy: [35, 10751, 16],      // Comedy, Family, Animation
  sad: [18, 10749],            // Drama, Romance
  neutral: [12, 28, 53],       // Adventure, Action, Thriller
};

const MoodResult = () => {
  const { mood } = useParams();
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const genres = moodGenres[mood.toLowerCase()] || [];
      const genreQuery = genres.join(',');

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreQuery}&sort_by=popularity.desc`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 20)); // Show top 20
    };

    fetchMovies();
  }, [mood]);

  const fetchTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    const trailer = data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
    if (trailer) {
      setTrailerKey(trailer.key);
    } else {
      setTrailerKey(null);
      alert("Trailer not available for this movie.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-center capitalize">
        Movie Picks for a {mood} Mood
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 bg-black rounded-lg shadow-md">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="mt-1 mb-3 text-sm text-gray-600">{movie.overview?.slice(0, 100)}...</p>
            <button
              onClick={() => fetchTrailer(movie.id)}
              className="px-3 py-1 text-white bg-red-700 rounded hover:bg-red-900"
            >
              Watch Trailer
            </button>
          </div>
        ))}
      </div>

      {trailerKey && (
        <div className="mt-10 text-center">
          <h2 className="mb-2 text-2xl font-bold">Now Playing</h2>
          <div className="w-full max-w-4xl mx-auto aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className="w-full rounded-lg shadow-lg h-96"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodResult;
