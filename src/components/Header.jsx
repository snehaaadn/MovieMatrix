function Header() {
    return (
        <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <a href="#home" className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#240046] to-[#5a189a] dark:from-[#c77dff] dark:to-[#e0aaff] transition-transform duration-300 hover:scale-105 ">
            MovieMatrix
          </a>
          <nav className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base">
            <a href="#home" className="relative group px-3 py-2 transition-colors duration-300">
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7b2cbf] dark:bg-[#c77dff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
            </a>
            <a href="#movies" className="relative group px-3 py-2 transition-colors duration-300">
                <span>Movies</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7b2cbf] dark:bg-[#c77dff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
            </a>
            <a href="#contact" className="relative group px-3 py-2 transition-colors duration-300">
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7b2cbf] dark:bg-[#c77dff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
            </a>
          </nav>
        </div>
      </header>
    )
}

export default Header;