import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './movies.css';

const Tag = ({
  genre = '',
  filter = false,
  genres = [],
  setGenres }) => {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      setGenres(genres.filter(g => g !== genre));
      setSelected(false);
    } else {
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag ${selected ? 'selected' : ''}`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
};

Tag.propTypes = {
  genre: PropTypes.string.isRequired,
  filter: PropTypes.bool,
  genres: PropTypes.array.isRequired,
  setGenres: PropTypes.func.isRequired,
};

export default Tag;
