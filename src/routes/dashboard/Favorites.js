// src/routes/Favorites

import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig'; 
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/api/titles/favorite');
        console.log('API Response - favorites:', response.data);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <div className="content">
        <header className="favorites-header">
          <h1>Favorites</h1>
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

export default Favorites;
