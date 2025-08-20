import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import BackIcon from '../components/icons/BackIcon';

function MovieDetailsPage({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = '1b590b2e07b698b9ce11d7332db21493';
  const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieRes = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        const movieData = await movieRes.json();
        setMovie(movieData);

        const creditsRes = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`);
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 10));

        const videosRes = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`);
        const videosData = await videosRes.json();
        const officialTrailer = videosData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailer(officialTrailer);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) return <div className="h-screen flex justify-center items-center bg-gray-900"><LoadingSpinner /></div>;
  if (error) return <div className="h-screen flex justify-center items-center bg-gray-900"><ErrorMessage message={error} /></div>;
  if (!movie) return null;

  return (
    <div className="bg-gray-100 dark:bg-[#10002b]  text-gray-900 dark:text-gray-100">
      <div
        className="w-full h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container mx-auto px-4 py-8 -mt-48 relative z-10">
        <button onClick={onBack}
          className="flex items-center bg-[#5a189a] dark:bg-[#7b2cbf] text-white font-bold px-4 py-2 rounded-full hover:bg-[#6a1b9a] dark:hover:bg-[#9d4edd] transition-colors mb-8">
          <BackIcon /> Back to Movies
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg shadow-2xl w-full" />
          </div>
          <div className="w-full md:w-2/3 mt-30 text-gray-800 dark:text-gray-300">
            <h1 className="text-5xl font-black mb-2">{movie.title}</h1>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">{movie.tagline}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
              <span>&bull;</span>
              <span>{movie.runtime} min</span>
              <span>&bull;</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map(g => <span key={g.id} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">{g.name}</span>)}
            </div>
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-8">{movie.overview}</p>

            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {cast.map(c => (
                <div key={c.cast_id} className="flex-shrink-0 w-28 text-center">
                  <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : 'https://placehold.co/185x278/374151/9CA3AF?text=No+Image'} alt={c.name} className="rounded-lg shadow-md w-full h-40 object-cover" />
                  <p className="font-bold mt-2 text-sm">{c.name}</p>
                  <p className="text-gray-400 text-xs">{c.character}</p>
                </div>
              ))}
            </div>

            {trailer && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;