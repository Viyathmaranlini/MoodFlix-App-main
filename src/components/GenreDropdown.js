// src/components/GenreDropdown.js
import React from "react";
import { Link } from "react-router-dom";

const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Thriller", id: 53 },
  { name: "Adventure", id: 12 },
  { name: "Romance", id: 10749 },
  { name: "Crime", id: 80 },
  { name: "Science Fiction", id: 878 },
  { name: "Fantasy", id: 14 },
  { name: "Family", id: 10751 },
];

const GenreDropdown = () => {
  return (
    <div className="relative group">
      <button className="px-4 py-2 text-white hover:underline">
        TOP GENRES ▼
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute left-0 z-50 hidden w-48 mt-2 bg-black border border-gray-700 rounded-md shadow-lg group-hover:block">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/genres/${genre.id}`}
            className="block px-4 py-2 text-white border-b border-gray-700 hover:bg-gray-800"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDropdown;
