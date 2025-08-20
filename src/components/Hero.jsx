const Hero = ({ movies }) => {
    if (!movies || movies.length === 0) return null;

    const movieMarquee = [...movies, ...movies];
    const backgroundImageUrl = `https://image.tmdb.org/t/p/original${movies[6].backdrop_path}`;

    return (
        <section id="home" className="relative w-full h-screen py-16 md:py-24 text-center overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center blur-lg scale-110 brightness-75 dark:brightness-50 opacity-70 dark:opacity-90"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            ></div>
            <div className="relative z-10">
                <div className="container mx-auto px-4">

                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-3 animate-fade-in-up transition-transform duration-300 hover:scale-105 ">
                        Welcome to <span className="bg-[#240046] text-transparent bg-clip-text bg-gradient-to-r from-[#5a189a] dark:from-[#c77dff] dark:to-[#e0aaff]">MovieMatrix</span>
                    </h2>

                    <p className="text-2xl text-gray-900 dark:text-white mb-5 animate-fade-in-up transition-transform duration-300 hover:scale-105" style={{ animationDelay: '0.2s' }}>
                        Explore the world of cinema
                    </p>

                    <a 
                        href="#movies" 
                        className="animate-float inline-block bg-[#5a189a] dark:bg-[#5a189a]  text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-[#7b2cbf] dark:hover:from-[#240046] dark:hover:to-[#5a189a] transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                       <span className="flex items-center gap-2 ">
                            Explore Movies
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </a>

                </div>

                <div className="w-full h-130 mt-0 overflow-hidden relative hero-container flex flex-col justify-center items-center">
                    <div className="flex animate-scroll">
                        {movieMarquee.map((movie, index) => (
                            <div key={`${movie.id}-${index}`} className="flex-shrink-0 w-60 mx-4 hover:scale-105 transition-transform duration-300">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className=" rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
