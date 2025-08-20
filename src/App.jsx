import React from 'react';
import AppRouter from './routes/AppRouter';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#10002b] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      <AppRouter />
    </div>
  );
}

export default App;