// src/components/movies/MovieCard.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './movies.css';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // hook to get favorite and watch later status
    axios.get('http://localhost/8000/api/titles/favorite/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => {
      setIsFavorite(response.data.includes(movie.imdbId))
    }).catch(error => {
      console.error(`Favorites Movie card error: ${error}`);
    })

    axios.get('http://localhost/8000/api/titles/watchLater/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => {
      setIsWatchLater(response.data.includes(movie.imdbId))
    }).catch(error => {
      console.error(`Watch Later movie card error: ${error}`);
    })
  }, []);

  const handleClick = async (type) => {
    const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;
    const setState = type === 'favorite' ? setIsFavorite : setIsWatchLater;
    const currentState = type === 'favorite' ? isFavorite : isWatchLater;

    try {
      if (currentState) {
        await axios.delete(url);
        setState(false);
      } else {
        await axios.post(url);
        setState(true);
      }
    } catch (error) {
      console.error(`Error updating ${type} status`, error);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-header">
        <h3>{movie.title}</h3>
        <div className="movie-actions">
          <FontAwesomeIcon
            icon={faStar}
            className={`action-icon ${isFavorite ? 'favorite' : ''}`}
            onClick={() => handleClick('favorite')}
          />
          <FontAwesomeIcon
            icon={faClock}
            className={`action-icon ${isWatchLater ? 'watchlater' : ''}`}
            onClick={() => handleClick('watchlater')}
          />
        </div>
      </div>
      <p className="movie-synopsis">{movie.synopsis}</p>
      <ul className="movie-genres">
        {movie.genres.map((genre, index) => (
          <li key={index} className="genre">{genre}</li>
        ))}
      </ul>
    </li>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default MovieCard;
