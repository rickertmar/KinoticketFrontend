import React, { useState } from 'react';

const movies = [
  { id: 1, name: 'Movie 1', genre: 'Action', releaseYear: '2022' },
  { id: 2, name: 'Movie 2', genre: 'Comedy', releaseYear: '2021' },
  { id: 3, name: 'Movie 3', genre: 'Drama', releaseYear: '2023' },
  // Add more movies as needed
];

const Movies = ({ setSelectedItem }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-2xl font-semibold mb-4">Movies</h1>
      <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Year</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} onClick={() => handleMovieClick(movie)} className="cursor-pointer hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.releaseYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMovie && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Selected Movie</h2>
          <p><strong>Name:</strong> {selectedMovie.name}</p>
          <p><strong>Genre:</strong> {selectedMovie.genre}</p>
          <p><strong>Release Year:</strong> {selectedMovie.releaseYear}</p>
        </div>
      )}
      <button onClick={() => setSelectedItem('dashboard')} className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Movies;
