import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

const Showing = () => {
  const [showings, setShowings] = useState([]);
  const [formData, setFormData] = useState({
    time: '',
    showingExtras: '',
    movieId: '',
    cinemaHallId: '',
    seatPrice: '',
  });

  useEffect(() => {
    // Fetch all showings when the component mounts
    fetchShowings();
  }, []);

  const fetchShowings = async () => {
    try {
      const response = await axios.get(process.env.API_URL + '/showings');
      setShowings(response.data);
    } catch (error) {
      console.error('Error fetching showings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to create a new showing
      await axios.post(process.env.API_URL + '/showings', formData);
      // Clear the form and fetch updated showings
      setFormData({
        time: '',
        showingExtras: '',
        movieId: '',
        cinemaHallId: '',
        seatPrice: '',
      });
      fetchShowings();
    } catch (error) {
      console.error('Error creating showing:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleDelete = async (showingId) => {
    try {
      // Make a DELETE request to delete the showing with the given ID
      await axios.delete(`${process.env.API_URL}/showings/${showingId}`);
      // After successful deletion, fetch updated showings and remove the deleted item from the state
      fetchShowings();
      // Remove the deleted showing from the state
      setShowings((prevShowings) => prevShowings.filter((showing) => showing.id !== showingId));
    } catch (error) {
      console.error('Error deleting showing:', error);
    }
  };
  

  // Sample test data for existing showings
  const sampleShowings = [
    {
      id: 1,
      time: '2023-09-15T14:30',
      showingExtras: '3D',
      movieId: 101,
      cinemaHallId: 1,
      seatPrice: 12.99,
    },
    {
      id: 2,
      time: '2023-09-15T17:00',
      showingExtras: '2D',
      movieId: 102,
      cinemaHallId: 2,
      seatPrice: 10.99,
    },
  ];
  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>Manage Showings - DHBW Kino</title>
        <meta
          name="description"
          content="Create and manage showings for DHBW Kino. Set showing time, extras, movie, cinema hall, and seat price."
        />
      </Head>
      <div className="mt-10 px-20 py-5">
        <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-accent-50">
            Manage Showings
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-white">
                Showing Time
              </label>
              <input
                type="datetime-local"
                name="time"
                id="time"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="showing-extras" className="block text-sm font-medium text-white">
                Showing Extras
              </label>
              <select
                name="showingExtras"
                id="showing-extras"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formData.showingExtras}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="4D">4D</option>
              </select>
            </div>
            <div>
              <label htmlFor="movie-id" className="block text-sm font-medium text-white">
                Movie ID
              </label>
              <input
                type="number"
                name="movieId"
                id="movie-id"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formData.movieId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cinema-hall-id" className="block text-sm font-medium text-white">
                Cinema Hall ID
              </label>
              <input
                type="number"
                name="cinemaHallId"
                id="cinema-hall-id"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formData.cinemaHallId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="seat-price" className="block text-sm font-medium text-white">
                Seat Price
              </label>
              <input
                type="number"
                name="seatPrice"
                id="seat-price"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formData.seatPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-accent-30 text-white font-medium rounded-md hover:bg-accent-40 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Create Showing
            </button>
          </form>
        </div>

        
<div className="mt-10">
  <h2 className="flex justify-center items-center text-2xl font-semibold text-accent-50 mb-4">Existing Showings</h2>
  
  <ul>
    {showings.length > 0 ? (
      showings.map((showing) => (
        <li key={showing.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p>
            <strong className="text-gray-700">Showing Time:</strong> {showing.time}
          </p>
          <p>
            <strong className="text-gray-700">Showing Extras:</strong>{' '}
            {showing.showingExtras || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-700">Movie ID:</strong> {showing.movieId}
          </p>
          <p>
            <strong className="text-gray-700">Cinema Hall ID:</strong> {showing.cinemaHallId}
          </p>
          <p>
            <strong className="text-gray-700">Seat Price:</strong> ${showing.seatPrice.toFixed(2)}
          </p>
          <div className="mt-2">
            <button
              onClick={() => handleEdit(showing)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(showing.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : sampleShowings.length > 0 ? (
      sampleShowings.map((showing) => (
        <li key={showing.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p>
            <strong className="text-gray-700">Showing Time:</strong> {showing.time}
          </p>
          <p>
            <strong className="text-gray-700">Showing Extras:</strong> {showing.showingExtras || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-700">Movie ID:</strong> {showing.movieId}
          </p>
          <p>
            <strong className="text-gray-700">Cinema Hall ID:</strong> {showing.cinemaHallId}
          </p>
          <p>
            <strong className="text-gray-700">Seat Price:</strong> ${showing.seatPrice.toFixed(2)}
          </p>
          <div className="flex justify-center items-center mt-2 ">
         
            <button
              onClick={() => handleDelete(showing.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <p className="text-white">No showings available.</p>
    )}
  </ul>
</div>


      </div>
    </div>
  );
};
export default Showing;
