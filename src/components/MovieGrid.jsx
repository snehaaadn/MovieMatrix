import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onMovieSelect }) => {
  return (
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />)}
    </div>
  );
};

export default MovieGrid;