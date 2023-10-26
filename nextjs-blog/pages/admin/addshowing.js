import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";

const AddNewShowing = ({ handleItemClick }) => {
  const cancelAddShowing = () => {
    handleItemClick("showing");
  };

  const [newShowing, setNewShowing] = useState({
    id: "",
    time: "",
    showingExtras: "",
    movieId: "",
    cinemaHallId: "",
    seatPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShowing({ ...newShowing, [name]: value });
  };

  const handleAddShowing = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.API_URL + "/cinemas/{cinemaId}/showing",
        newShowing
      ); // check if newShowing attribute korrekte Datentyp hat
      setNewShowing({
        id: "",
        time: "",
        showingExtras: "",
        movieId: "",
        cinemaHallId: "",
        seatPrice: "",
      });
    } catch (error) {
      console.error("Error adding showing:", error);
    }
    handleItemClick("showing");
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen">
      <Head>
        <title>Add Showing</title>
        <meta name="description" content="Add a new showing to the list." />
      </Head>
      <div className="mb-15 rounded-3xl px-20 py-5 w-full max-w-2xl bg-primary-20">
        <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-accent-50">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-accent p-3 rounded">
            Add Showing
          </h2>
        </div>
        <form
          className="mt-8 space-y-6  p-6 rounded shadow"
          onSubmit={handleAddShowing}
        >
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-white"
            >
              Showing Time
            </label>

            {/* Je nach dem wenns unnötig ist was entfernen. Hier wird aktuell nach alle Parameterübergabe sortiert */}
            <input
              type="datetime-local"
              name="time"
              id="time"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newShowing.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="showingExtras"
              className="block text-sm font-medium text-white"
            >
              Extras
            </label>
            <select
              id="showingExtras"
              name="showingExtras"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newShowing.showingExtras}
              onChange={handleInputChange}
              required
            >
              <option value="">Select an Extra</option>
              <option value="3D">3D</option>
              <option value="Atmos">Dolby Atmos</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="movieId"
              className="block text-sm font-medium text-white"
            >
              Movie ID
            </label>
            <textarea
              id="movieId"
              name="movieId"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newShowing.movieId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="cinemaHallId"
              className="block text-sm font-medium text-white"
            >
              Cinema Hall ID
            </label>
            <textarea
              id="cinemaHallId"
              name="cinemaHallId"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newShowing.cinemaHallId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="seatPrice"
              className="block text-sm font-medium text-white"
            >
              Seat Price
            </label>
            <textarea
              id="seatPrice"
              name="seatPrice"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={newShowing.seatPrice}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-accent-30 text-white font-medium rounded-md hover:bg-accent-40 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Add Showing
          </button>
          <button
            onClick={cancelAddShowing}
            className="w-full py-3 px-4 text-white font-medium rounded-md bg-red-500 hover:bg-red-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewShowing;
