import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { IoSearchOutline } from 'react-icons/io5';
import { navigation } from '../contant/navigation';

// Genres list
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

// Languages list
const languages = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "French", code: "fr" },
  { name: "Spanish", code: "es" },
  { name: "Japanese", code: "ja" },
];

// Years list (2024 to 2015)
const years = Array.from({ length: 10 }, (_, i) => 2024 - i);

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join("");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className='fixed top-0 z-40 w-full h-16 bg-black bg-opacity-50'>
      <div className='container flex items-center h-full px-3 mx-auto'>
        {/* Logo */}
        <Link to={"/"}>
          <div>
            <h1 className="text-[25px] font-bold text-red-700 h-full flex items-center mr-8">MoodFlix</h1>
          </div>
        </Link>

        {/* Navigation with dropdowns */}
        <nav className='relative items-center hidden gap-4 ml-5 lg:flex'>
          {navigation.map((nav, index) => (
            <NavLink key={index} to={nav.href} className="text-white hover:underline">
              {nav.label}
            </NavLink>
          ))}

          {/* Top Genres Dropdown */}
          <div className="relative group">
            <button className="px-2 py-1 text-white hover:underline">
              TOP GENRES ▼
            </button>
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

          {/* Top Languages Dropdown */}
          <div className="relative group">
            <button className="px-2 py-1 text-white hover:underline">
              TOP LANGUAGES ▼
            </button>
            <div className="absolute left-0 z-50 hidden w-48 mt-2 bg-black border border-gray-700 rounded-md shadow-lg group-hover:block">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  to={`/language/${lang.code}`}
                  className="block px-4 py-2 text-white border-b border-gray-700 hover:bg-gray-800"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Top Years Dropdown */}
          <div className="relative group">
            <button className="px-2 py-1 text-white hover:underline">
              TOP YEARS ▼
            </button>
            <div className="absolute left-0 z-50 hidden w-48 mt-2 bg-black border border-gray-700 rounded-md shadow-lg group-hover:block">
              {years.map((year) => (
                <Link
                  key={year}
                  to={`/year/${year}`}
                  className="block px-4 py-2 text-white border-b border-gray-700 hover:bg-gray-800"
                >
                  {year}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Search and User Icon */}
        <div className='flex items-center gap-5 ml-auto'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Search...'
              className='hidden px-4 py-1 text-white bg-transparent border border-gray-500 rounded lg:block'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className='text-2xl text-white'>
              <IoSearchOutline />
            </button>
          </form>
          <div className='h-8 overflow-hidden transition-all rounded-full cursor-pointer w-9 active:scale-50'>
            <img
              src={userIcon}
              alt="User Icon"
              className='w-10 h-10'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
