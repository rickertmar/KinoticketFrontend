import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className="min-h-screen bg-primary-50 p-8">
     
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Manage Showings</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
          {/* Form inputs for creating a new showing */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Showing Time</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
  <label className="block text-gray-700 text-sm font-bold mb-2">Showing Extras</label>
  <select
    name="showingExtras"
    value={formData.showingExtras}
    onChange={handleInputChange}
    className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select an option</option>
    <option value="2D">2D</option>
    <option value="3D">3D</option>
    <option value="4D">4D</option>
  </select>
</div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Movie ID</label>
              <input
                type="number"
                name="movieId"
                value={formData.movieId}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Cinema Hall ID</label>
              <input
                type="number"
                name="cinemaHallId"
                value={formData.cinemaHallId}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Seat Price</label>
            <input
              type="number"
              name="seatPrice"
              value={formData.seatPrice}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-accent-50 hover:bg-accent-40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Showing
          </button>
        </form>

        {/* Display existing showings */}
        <div>
  <h2 className="text-2xl font-semibold mb-4">Existing Showings</h2>
  <ul>
    {showings.map((showing) => (
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
          <strong className="text-gray-700">Seat Price:</strong> {showing.seatPrice}
        </p>
      </li>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
};

export default Showing;
