// src/routes/WatchLater

import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await api.get('/api/titles/watchlater');
        console.log('API Response - watchlater', response.data);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching watch later:', error);
      }
    };

    fetchWatchLater();
  }, []);

  return (
    <div className="watch-later">
      <div className="content">
        <header className="watch-later-header">
          <h1>Watch Later</h1>
        </header>
        <div className="movie-cards">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
