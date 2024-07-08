// src/components/movies/MovieCard.js

import React from 'react';
import PropTypes from 'prop-types';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ image, title, description, tags }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={image} alt={title} />
        <div className="movie-card-icons">
          <FontAwesomeIcon icon={faStar} className="icon" />
          <FontAwesomeIcon icon={faClock} className="icon" />
        </div>
        <div className="movie-card-title">
          <span>{title}</span>
        </div>
      </div>
      <div className="movie-card-description">
        <p>{description}</p>
      </div>
      <div className="movie-card-tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieCard;
