const ErrorMessage = ({ message }) => (
  <div className="text-center my-10 p-6 bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-600 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">Oops! An Error Occurred</h2>
    <p className="mt-2 text-red-600 dark:text-red-300">{message}</p>
  </div>
);

export default ErrorMessage;