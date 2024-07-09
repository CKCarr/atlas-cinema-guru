// src/routes/HomePage

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import './dashboard.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = useCallback(async (page) => {
    try {
      const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include your auth token here
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          minYear,
          maxYear,
          genres: genres.join(),
          title,
          sort,
          page,
        },
      });
      const movieData = Array.isArray(response.data) ? response.data : [];
      if (page === 1) {
        setMovies(movieData);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...movieData]);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
      setMovies([]); // Ensure movies is always an array
    }
  }, [minYear, maxYear, genres, title, sort]);

  useEffect(() => {
    loadMovies(page);
  }, [loadMovies, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="dashboard-container">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <div>
        <ul className="movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </ul>
        <Button onClick={handleLoadMore} text="Load More.." />
      </div>

    </div>
  );
};

export default HomePage;
