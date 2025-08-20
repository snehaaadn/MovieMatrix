const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <a href="#movies">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} 
          className="px-4 py-2 bg-[#5a189a] dark:bg-[#7b2cbf] text-white rounded-lg shadow-md hover:bg-[#9d4edd] disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            Previous
        </button>
      </a>

      <span className="text-lg font-medium">Page {currentPage} of {totalPages > 500 ? 500 : totalPages}</span>

      <a href="#movies">
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || currentPage >= 500} 
          className="px-4 py-2 bg-[#5a189a] dark:bg-[#7b2cbf] text-white rounded-lg shadow-md hover:bg-[#9d4edd] disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            Next
        </button>
      </a>
    </div>
  );
};

export default Pagination;
