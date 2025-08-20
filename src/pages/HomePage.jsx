import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import MovieGrid from '../components/MovieGrid';
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Hero from '../components/Hero';
import SearchIcon from '../components/icons/SearchIcon';

function HomePage({ onMovieSelect, page, setPage }) {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // free API key from The Movie Database (TMDB)
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    let endpoint = searchTerm
      ? `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&page=${page}`
      : `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${page}&sort_by=popularity.desc${selectedGenre ? `&with_genres=${selectedGenre}` : ''}${selectedYear ? `&primary_release_year=${selectedYear}` : ''}`;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 401) throw new Error('Invalid API Key. Please check your TMDB API key.');
        throw new Error('Something went wrong fetching movies.');
      }
      const data = await response.json();
      setMovies(data.results.filter(movie => movie.poster_path));
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedGenre, selectedYear]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreResponse = await fetch(`${TMDB_API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
        if (!genreResponse.ok) throw new Error('Failed to fetch genres.');
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);

        const heroResponse = await fetch(`${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`);
        if (!heroResponse.ok) throw new Error('Failed to fetch hero movies.');
        const heroData = await heroResponse.json();
        setHeroMovies(heroData.results.filter(m => m.poster_path && m.backdrop_path).slice(0, 12));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (TMDB_API_KEY !== 'YOUR_TMDB_API_KEY_HERE') {
      fetchGenres();
    }
  }, []);


  useEffect(() => {
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
      setError('Please replace "YOUR_TMDB_API_KEY_HERE" with your actual TMDB API key.');
      setLoading(false);
      return;
    }
    fetchMovies();
  }, [fetchMovies, TMDB_API_KEY]);


  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    const formData = new FormData(e.target);
    const newSearchTerm = formData.get('search');
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      setSelectedGenre('');
      setSelectedYear('');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setSearchTerm('');
    setPage(1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSearchTerm('');
    setPage(1);
  };

  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    yearOptions.push(year);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#10002b] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 flex flex-col">

      <Header />

      <Hero movies={heroMovies} />

      <main id="movies" className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold hover:scale-105 transition-transform duration-300">Explore Movies</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 hover:scale-105 transition-transform duration-300">Find your next favorite film from our vast collection.</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <FilterDropdown options={genres.map(g => ({ value: g.id, label: g.name }))} 
              value={selectedGenre} onChange={handleGenreChange} 
              placeholder="All Genres" 
            />

            <FilterDropdown options={yearOptions.map(y => ({ value: y, label: y }))} value={selectedYear} onChange={handleYearChange} placeholder="All Years" />

            <div className="flex items-center space-x-2 sm:space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input type="text" name="search" placeholder="Search..." className="w-24 sm:w-40 pl-4 pr-12 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5a189a] focus:border-transparent transition-all duration-300" />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#5a189a] dark:bg-[#7b2cbf] text-white hover:bg-[#9d4edd] transition-colors duration-300">
                  <SearchIcon />
                </button>
              </form>
            </div>

          </div>
        </div>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <MovieGrid movies={movies} onMovieSelect={onMovieSelect} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
