// src/components/movies/MovieCard.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/axiosConfig'; // Import the configured Axios instance
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import unavailableImage from '../../assets/unavailable.svg'; // Import the placeholder image


const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [imageUrl, setImageUrl] = useState(movie.imageurls && movie.imageurls[0] ? movie.imageurls[0] : unavailableImage );

  useEffect(() => {
    // Fetch user's favorite and watch later movies
    const fetchUserLists = async () => {
      try {
        const [favoritesResponse, watchLaterResponse] = await Promise.all([
          api.get('/api/titles/favorite/'),
          api.get('/api/titles/watchlater/')
        ]);

        const isFavorite = favoritesResponse.data.some(fav => fav.imdbId === movie.imdbId);
        const isWatchLater = watchLaterResponse.data.some(wl => wl.imdbId === movie.imdbId);

        setIsFavorite(isFavorite);
        setIsWatchLater(isWatchLater);
      } catch (error) {
        console.error('Error fetching user lists:', error);
      }
    };

    fetchUserLists();
  }, [movie.imdbId]);

  const handleClick = async (type) => {
    try {
      const url = `/api/titles/${type}/${movie.imdbId}`;
      const currentState = type === 'favorite' ? isFavorite : isWatchLater;

      if (currentState) {
        await api.delete(url);
      } else {
        await api.post(url);
      }

      if (type === 'favorite') {
        setIsFavorite(!isFavorite);
      } else {
        setIsWatchLater(!isWatchLater);
      }
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
    }
  };

  const handleImageError = () => {
    setImageUrl(unavailableImage); // Placeholder image URL
  };

  return (
      <li className="movie-card">
        <div className="movie-card-content">
          <img src={imageUrl} alt={movie.title} onError={handleImageError} className="movie-image" />
          <div className="movie-overlay">
            <h2 className="movie-title">{movie.title}</h2>
          </div>
          <div className="movie-icons">
            <FontAwesomeIcon
              icon={faStar}
              onClick={() => handleClick('favorite')}
              className={isFavorite ? 'icon-favorite active' : 'icon-favorite'}
            />
            <FontAwesomeIcon
              icon={faClock}
              onClick={() => handleClick('watchlater')}
              className={isWatchLater ? 'icon-watchlater active' : 'icon-watchlater'}
            />
          </div>
        </div>
            <p className="movie-synopsis">{movie.synopsis}</p>
            <div className="movie-genres">
              {movie.genres.map((genre, index) => (
                <span key={index} className="movie-genre">{genre}</span>
              ))}
            </div>
      </li>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
