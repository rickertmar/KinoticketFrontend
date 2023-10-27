import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddMovie = ({ handleItemClick }) => {
  const continueAddMovie = () => {
    handleItemClick("addmovie");
  };
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get(process.env.API_URL + "/cinemas/movies", {
          headers: { "Content-Type": "application/json" },
          validateStatus: function (status) {
            return status >= 200 && status < 305; // Accept status code in the range 200-304
          },
        })
        .then((response) => {
          setMovies(response.data);
          console.log("Movies set:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    }
  }, []);

  const handleDeleteMovie = (movieId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      console.log("selected id" + movieId);
      axios
        .delete(`${process.env.API_URL}/cinemas/movies/${movieId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((response) => {
          // If the deletion was successful, update the local
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== movieId)
          );
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
          alert("Failed to delete the movie. Please try again.");
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-">
      <div className="rounded-3xl mb-15 px-10 py-5 w-full max-w-2xl flex flex-1 flex-col bg-primary-20 justify-center items-center">
        <h2 className="flex ml-4 justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">
          Existing Movies
        </h2>
        <div className="overflow-y-auto flex-1 w-full">
          {movies.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Title
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Release Year
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Genres
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="h-24 border-gray-300 border-b">
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {movie.title}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {movie.releaseYear}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {movie.genres}
                    </td>
                    <td className="text-sm">
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
