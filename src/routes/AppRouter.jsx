import React, { useState } from 'react';
import HomePage from '../pages/HomePage';
import MovieDetailsPage from '../pages/MovieDetailsPage';

function AppRouter() {
  const [view, setView] = useState('home');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [page, setPage] = useState(1);

  const navigateToDetails = (movieId) => {
    setSelectedMovieId(movieId);
    setView('details');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setSelectedMovieId(null);
    setView('home');
    setTimeout(() => {
      document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div>
      {view === 'home' && <HomePage onMovieSelect={navigateToDetails} page={page} setPage={setPage} />}
      {view === 'details' && <MovieDetailsPage movieId={selectedMovieId} onBack={navigateToHome} />}
    </div>
  );
}

export default AppRouter;
