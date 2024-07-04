// src/components/general/SearchBar.js
import React from 'react';
import PropTypes from 'prop-types';
import './general.css';

const SearchBar = ({
    title,
    setTitle,
    className = ''
}) => {
    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className={`select-container ${className}`}>
            <input
            type="text"
            value={title}
            onChange={handleInput}
            className="search-bar"
            placeholder="Search..."
            />
        </div>
    );
};

SearchBar.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default SearchBar;
