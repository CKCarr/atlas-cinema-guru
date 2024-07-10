// src/components/general/SearchBar.js
import React from 'react';
import PropTypes from 'prop-types';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ title, setTitle, className = '' }) => {
    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className={`search-bar-container ${className}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
                type="text"
                value={title}
                onChange={handleInput}
                className="search-bar"
                placeholder="Search"
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
