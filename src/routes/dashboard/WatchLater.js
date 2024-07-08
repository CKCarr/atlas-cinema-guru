// src/routes/WatchLater

import React, { useState, useEffect } from 'react';
import axios from 'axios';


import MovieCard from '../../components/movies/MovieCard';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/titles/watchlater');
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

export default WatchLater;
