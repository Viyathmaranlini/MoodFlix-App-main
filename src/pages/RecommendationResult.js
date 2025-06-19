import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const genreMap = {
  "🔥 High action and excitement": 28,
  "😌 Calm and relaxing": 35,
  "🧠 Thought-provoking and deep": 18,
  "😂 Light and funny": 35,
  "❤️ Emotional and romantic": 10749,
  "🎭 Dramatic": 18,
  "🎬 Realistic or based on true events": 99,
  "🚀 Fantastical or imaginative": 14,
  "👻 Spooky or thrilling": 27,
  "👪 Family-friendly": 10751,
};

const TMDB_API_KEY = '99ac615ee13f0be588c5e904e5602336';

const RecommendationPage = () => {
  const { state } = useLocation();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const selectedGenres = Object.values(state.answers)
      .map(answer => genreMap[answer])
      .filter(Boolean);

    const fetchRecommendation = async () => {
      try {
        // 1. Discover a movie
        const genreQuery = selectedGenres.join(',');
        const discoverRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: TMDB_API_KEY,
              with_genres: genreQuery,
              sort_by: 'popularity.desc',
              page: 1,
            },
          }
        );

        const recommended = discoverRes.data.results[Math.floor(Math.random() * 10)];
        setMovie(recommended);

        // 2. Fetch trailer
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${recommended.id}/videos`,
          {
            params: { api_key: TMDB_API_KEY },
          }
        );

        const ytTrailer = videoRes.data.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (ytTrailer) {
          setTrailer(`https://www.youtube.com/embed/${ytTrailer.key}`);
        }

        // 3. Fetch cast
        const castRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${recommended.id}/credits`,
          {
            params: { api_key: TMDB_API_KEY },
          }
        );
        setCast(castRes.data.cast.slice(0, 5)); // Top 5 cast members
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movie recommendation.');
      }
    };

    const fetchTrendingMovies = async () => {
      try {
        const trendingRes = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week`,
          {
            params: { api_key: TMDB_API_KEY },
          }
        );
        setTrendingMovies(trendingRes.data.results.slice(0, 5)); // Top 5 trending movies
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
      }
    };

    fetchRecommendation();
    fetchTrendingMovies();
  }, [state.answers]);

  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen text-white bg-center bg-cover"
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`
          : 'none',
      }}
    >
      <div className="min-h-screen p-6 bg-gradient-to-b from-black/70 to-black/90">
        <h1 className="mb-6 text-3xl font-bold text-center">Your Movie Recommendation</h1>
        {movie ? (
          <div className="max-w-3xl p-6 mx-auto rounded-lg shadow-md bg-black/70">
            <h2 className="mb-4 text-3xl font-bold text-center">{movie.title}</h2>
            <p className="mb-6 text-center">{movie.overview}</p>

            {trailer && (
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-center">🎬 Trailer</h3>
                <div className="flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src={trailer}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {cast.length > 0 && (
              <div>
                <h3 className="mb-2 text-xl font-bold text-center">🎭 Top Cast</h3>
                <ul className="space-y-2">
                  {cast.map(actor => (
                    <li key={actor.id} className="flex items-center space-x-3">
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                          alt={actor.name}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                      <span>{actor.name} as {actor.character}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">Loading movie recommendation...</p>
        )}

        {trendingMovies.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-center">🔥 Trending Movies</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trendingMovies.map(trending => (
                <div
                  key={trending.id}
                  className="p-4 rounded-lg shadow-md bg-black/70"
                >
                  <img
                    className="mb-4 rounded-md"
                    src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
                    alt={trending.title}
                  />
                  <h3 className="text-lg font-semibold text-center">{trending.title}</h3>
                  <p className="text-sm text-center text-gray-400">
                    {trending.release_date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;