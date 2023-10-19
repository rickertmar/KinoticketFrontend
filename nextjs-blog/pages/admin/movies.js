import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

const AddMovie = () => {

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      fsk: 'FSK16',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      releaseYear: '2010',
      genres: 'Sci-Fi',
      director: 'Christopher Nolan',
      runningWeek: 1,
      runtime: '148 minutes',
      releaseCountry: 'USA',
      imageSrc: 'inception.jpg',
      actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      fsk: 'FSK16',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      releaseYear: '2008',
      genres: 'Action',
      director: 'Christopher Nolan',
      runningWeek: 1,
      runtime: '152 minutes',
      releaseCountry: 'USA',
      imageSrc: 'dark-knight.jpg',
      actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: '',
    fsk: '',
    description: '',
    releaseYear: '',
    genres: '',
    director: '',
    runningWeek: '',
    runtime: '',
    releaseCountry: '',
    imageSrc: '',
    actors: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.API_URL+ '/cinemas/{cinemaId}/movies', newMovie); // check if newMovie attribute korrekte Datentyp hat
      setNewMovie({
        title: '',
        fsk: '',
        description: '',
        releaseYear: '',
        genres: '',
        director: '',
        runningWeek: '',
        runtime: '',
        releaseCountry: '',
        imageSrc: '',
        actors: '',
      });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };


  const handleDeleteMovie = (movieId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      //API DELETEMOVIE
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Head>
        <title>Add Movie</title>
        <meta name="description" content="Add a new movie to the list." />
      </Head>
      <div className="mt-10 px-20 py-5 w-full max-w-2xl">
        <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-accent-50">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-accent p-3 rounded">
            Add Movie
          </h2>
        </div>
        <form className="mt-8 space-y-6  p-6 rounded shadow" onSubmit={handleAddMovie}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="fsk" className="block text-sm font-medium text-white">
              FSK
            </label>
            <input
              type="text"
              name="fsk"
              id="fsk"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.fsk}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="releaseYear" className="block text-sm font-medium text-white">
              Release Year
            </label>
            <select
              id="releaseYear"
              name="releaseYear"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.releaseYear}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div>
            <label htmlFor="genres" className="block text-sm font-medium text-white">
              Genres
            </label>
            <select
              id="genres"
              name="genres"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.genres}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
            </select>
          </div>

          <div>
            <label htmlFor="director" className="block text-sm font-medium text-white">
              Director
            </label>
            <input
              type="text"
              name="director"
              id="director"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.director}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="runningWeek" className="block text-sm font-medium text-white">
              Running Week
            </label>
            <input
              type="number"
              name="runningWeek"
              id="runningWeek"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.runningWeek}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="runtime" className="block text-sm font-medium text-white">
              Runtime
            </label>
            <input
              type="text"
              name="runtime"
              id="runtime"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.runtime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="releaseCountry" className="block text-sm font-medium text-white">
              Release Country
            </label>
            <input
              type="text"
              name="releaseCountry"
              id="releaseCountry"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.releaseCountry}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="imageSrc" className="block text-sm font-medium text-white">
              Image Source
            </label>
            <input
              type="text"
              name="imageSrc"
              id="imageSrc"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.imageSrc}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="actors" className="block text-sm font-medium text-white">
              Actors
            </label>
            <input
              type="text"
              name="actors"
              id="actors"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newMovie.actors}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-accent-30 text-white font-medium rounded-md hover:bg-accent-40 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Add Movie
          </button>
        </form>



        <div className="mt-10">
          <h2 className="flex justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded">Existing Movies</h2>
          {movies.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">Title</th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">Release Year</th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">Genres</th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="h-24 border-gray-300 border-b">
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">{movie.title}</td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">{movie.releaseYear}</td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">{movie.genres}</td>
                    <td className="text-sm pr-6">
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="text-red-500 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white">No movies available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMovie;