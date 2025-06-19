import React from 'react';
import BannerHome from '../components/BannerHome';
import HorizontalScollCard from '../components/HorizontalScollCard';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch('/movie/now_playing');
  const { data: topRatedData } = useFetch('/movie/top_rated');
  const { data: popularTvShowData } = useFetch('/tv/popular');
  const { data: OnTheAirShowData } = useFetch('/tv/on_the_air');

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <BannerHome />

      {/* Container for content with padding and max width */}
      <div className="px-4 mx-auto mt-12 space-y-16 max-w-7xl sm:px-6 lg:px-8">

        {/* Section Wrapper with heading + horizontal scroll */}
        <section className="space-y-4">
          <h2 className="text-4xl font-extrabold tracking-wide text-transparent drop-shadow-lg bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 animate-gradient-x">
            Trending Now
          </h2>
          <HorizontalScollCard data={trendingData} heading={"Trending"} trending={true} />
        </section>

        <section className="space-y-4">
          <h2 className="pl-3 text-3xl font-semibold tracking-wide text-pink-400 uppercase border-l-4 border-pink-600 drop-shadow-md">
            Now Playing
          </h2>
          <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
        </section>

        <section className="space-y-4">
          <h2 className="pl-3 text-3xl font-semibold tracking-wide text-purple-400 uppercase border-l-4 border-purple-600 drop-shadow-md">
            Top Rated Movies
          </h2>
          <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"} />
        </section>

        <section className="space-y-4">
          <h2 className="pl-3 text-3xl font-semibold tracking-wide text-indigo-400 uppercase border-l-4 border-indigo-600 drop-shadow-md">
            Popular TV Shows
          </h2>
          <HorizontalScollCard data={popularTvShowData} heading={"Popular TV Shows"} media_type={"tv"} />
        </section>

        <section className="space-y-4">
          <h2 className="pl-3 text-3xl font-semibold tracking-wide text-blue-400 uppercase border-l-4 border-blue-600 drop-shadow-md">
            On The Air
          </h2>
          <HorizontalScollCard data={OnTheAirShowData} heading={"On the Air"} media_type={"tv"} />
        </section>
      </div>
    </div>
  );
};

export default Home;
