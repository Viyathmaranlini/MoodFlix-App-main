//app.js

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';

function App() {
  const dispatch = useDispatch();

  // Fetch trending data
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/trending/all/week', {
        params: {
          api_key: '99ac615ee13f0be588c5e904e5602336', // Replace with your actual API key
        },
      });

      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  // Fetch configuration data
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/configuration', {
        params: {
          api_key: '99ac615ee13f0be588c5e904e5602336', // Replace with your actual API key
        },
      });

      dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
      console.log('Configuration data:', response.data);
    } catch (error) {
      console.error('Error fetching configuration data:', error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
