const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
);

const MovieCard = ({ movie, onMovieSelect }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const placeholderUrl = `https://placehold.co/500x750/374151/9CA3AF?text=${encodeURIComponent(movie.title)}`;
    
  return (
    <div onClick={() => onMovieSelect(movie.id)} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer">
      <div className="relative">
        <img src={imageUrl} alt={movie.title} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { e.target.onerror = null; e.target.src=placeholderUrl; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="text-sm mt-1">{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-end">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-amber-400">{movie.vote_average.toFixed(1)}</span>
          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{movie.original_language.toUpperCase()}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onMovieSelect(movie.id); }} 
          className="w-full mt-auto flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-[#5a189a] dark:bg-[#7b2cbf] rounded-lg shadow-md hover:bg-[#6a1b9a] dark:hover:bg-[#9d4edd] hover:scale-105 transform transition-transform duration-200 cursor-pointer">
          <InfoIcon /> Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;