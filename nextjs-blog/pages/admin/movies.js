import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AddMovie = () => {
  const router = useRouter();
  const continueAddMovie=()=>{
    router.push(`\addmovie`);
  }

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

    <div className="flex flex-col justify-center items-center my-">
  <div className="mt-10 px-20 py-5 w-full max-w-2xl flex flex-1 flex-col bg-primary-20 justify-center items-center">
    <h2 className="flex justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">Existing Movies</h2>
    <div className="overflow-y-auto flex-1 w-full"> {/* Add overflow-y-auto and flex-1 */}
      {movies.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">Title</th>
              <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">Release Year</th>
              <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">Genres</th>
              <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="h-24 border-gray-300 border-b">
                <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">{movie.title}</td>
                <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">{movie.releaseYear}</td>
                <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">{movie.genres}</td>
                <td className="text-sm pr-6">
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
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
    <button
      onClick={continueAddMovie}
      className="my-3 transition duration-300 ease-in-out font-normal py-3 px-6 rounded-lg bg-accent-40 text-white"
    >
      Add Movie
    </button>
  </div>
</div>

  );
};

export default AddMovie;