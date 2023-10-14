import React, { useState } from 'react';

const initialMovies = [
  { id: 1, name: 'Movie 1', genre: 'Action', releaseYear: '2022' },
  { id: 2, name: 'Movie 2', genre: 'Comedy', releaseYear: '2021' },
  { id: 3, name: 'Movie 3', genre: 'Drama', releaseYear: '2023' },
  // Add more movies as needed
];

const Movies = ({ setSelectedItem }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      // Deselect the movie if it's already selected
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  const handleDeleteMovie = () => {
    if (selectedMovie) {
      // Filter out the selected movie to delete it
      const updatedMovies = movies.filter((m) => m.id !== selectedMovie.id);
      // Update the movies list
      setMovies(updatedMovies);
      // Deselect the deleted movie
      setSelectedMovie(null);
    }
  };

  const isSelected = (movie) => selectedMovie && selectedMovie.id === movie.id;

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-2xl font-semibold mb-4">Movies</h1>
      <div className="p-4 rounded-lg shadow-md w-full overflow-x-auto bg-primary-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Release Year
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className={`cursor-pointer ${isSelected(movie) ? 'bg-gray-500' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {movie.name}
                  {isSelected(movie) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMovie();
                      }}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{movie.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{movie.releaseYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMovie && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Selected Movie</h2>
          <p><strong>Name:</strong> {selectedMovie.name}</p>
          <p><strong>Genre:</strong> {selectedMovie.genre}</p>
          <p><strong>Release Year:</strong> {selectedMovie.releaseYear}</p>
        </div>
      )
      }
    </div>
  );
};

export default Movies;
