// src/routes/Favorites

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css'

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/titles/favorites');
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
              image={movie.image}
              title={movie.title}
              description={movie.description}
              tags={movie.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
