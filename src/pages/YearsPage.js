import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const YearsDetailsPage = () => {
  const { year } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByYear = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_year=${year}&sort_by=popularity.desc`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error("Failed to fetch movies by year:", error);
      }
    };
    fetchMoviesByYear();
  }, [year]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-white">Top Movies Released in {year}</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="p-4 text-white transition bg-gray-900 shadow cursor-pointer rounded-xl hover:bg-gray-800"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="mb-2 rounded"
            />
            <div className="font-semibold">{movie.title}</div>
            <div className="text-sm text-gray-400">{movie.release_date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YearsDetailsPage;
