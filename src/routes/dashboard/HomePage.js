// src/routes/HomePage
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/axiosConfig'; // Import the configured Axios instance
import MovieCard from "../../components/movies/MovieCard";
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import './dashboard.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  const loadMovies = useCallback(async (page = 1) => {
    try {
      const response = await api.get('/api/titles/advancedsearch', {
        params: {
          minYear,
          maxYear,
          genres: genres.join(','),
          title,
          sort,
          page
        }
      });
      setMovies((prevMovies) => [...prevMovies, ...response.data.titles]);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }, [minYear, maxYear, genres, sort, title]);

  useEffect(() => {
    setMovies([]); // Reset movies when filter/sort changes
    loadMovies(page);
  }, [minYear, maxYear, genres, sort, title, page, loadMovies]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="homepage">
      <div className="filters">
        <Filter
          minYear={minYear}
          maxYear={maxYear}
          genres={genres}
          sort={sort}
          title={title}
          setMinYear={setMinYear}
          setMaxYear={setMaxYear}
          setGenres={setGenres}
          setSort={setSort}
          setTitle={setTitle}
        />
      </div>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="load-more-container">
        <Button label="Load More.." onClick={handleLoadMore} />
      </div>
    </div>
  );
};

export default HomePage;
