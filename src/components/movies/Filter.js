import React from 'react';
import PropTypes from 'prop-types';
import Input from '../general/Input';
import SearchBar from '../general/SearchBar';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';
import './movies.css';

const Filter = ({
  minYear = 1970,
  setMinYear,
  maxYear = 2022,
  setMaxYear,
  sort = '',
  setSort,
  genres = [],
  setGenres,
  title = '',
  setTitle,
}) => {

  const sortingOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' },
  ];

  const genreTags = [
    'action', 'drama', 'comedy', 'biography', 'romance', 'thriller', 'war',
    'history', 'sport', 'sci-fi', 'documentary', 'crime', 'fantasy'
  ];

  return (
    <div className='container'>
        <div className="filter-container-options">
        <div className='search-bar'>
            <SearchBar title={title} setTitle={setTitle} />
        </div>

        <div className='filter-options'>
            <Input
              label="Min Year"
              type="number"
              value={minYear}
              setValue={setMinYear}
              className="year-input"
            />

            <Input
              label="Max Year"
              type="number"
              value={maxYear}
              setValue={setMaxYear}
              className="year-input"
            />

            <SelectInput
              label="Sort By"
              options={sortingOptions}
              value={sort}
              setValue={setSort}
              className="sort-select"
            />
        </div>
    </div>

    <div className='tag-container'>
      <ul className="tags-list">
        {genreTags.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
    </div>


  );
};

Filter.propTypes = {
  minYear: PropTypes.number.isRequired,
  setMinYear: PropTypes.func.isRequired,
  maxYear: PropTypes.number.isRequired,
  setMaxYear: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  setGenres: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default Filter;
