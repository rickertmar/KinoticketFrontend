import React, { useState } from "react";
import axios from "axios";

const AddShowing = ({ handleItemClick }) => {
  const continueAddShowing = () => {
    handleItemClick("addshowing");
  };

  const [showings, setShowings] = useState([
    {
        id: 1,
        time: '2023-09-15 14:30',
        showingExtras: '3D',
        movieId: 101,
        cinemaHallId: 1,
        seatPrice: 12.99,
      },
      {
        id: 2,
        time: '2023-09-15 17:00',
        showingExtras: '2D',
        movieId: 102,
        cinemaHallId: 2,
        seatPrice: 10.99,
      },
  ]);

  const [newShowing, setNewShowing] = useState({
    id: "",
    time: "",
    showingExtras: "",
    movieId: "",
    cinemaHallId: "",
    seatPrice: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewShowing({ ...newShowing, [id]: value });
  };

  const handleAddShowing = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.API_URL + "/cinemas/{cinemaId}/showings",
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
  };

  const handleDeleteShowing = (showingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this showing?"
    );
    if (confirmDelete) {
      setShowings((prevShowings) =>
        prevShowings.filter((showing) => showing.id !== showingId)
      );
      //API DELETEMOVIE
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-">
      <div className="rounded-3xl mb-15 px-10 py-5 w-full max-w-2xl flex flex-1 flex-col bg-primary-20 justify-center items-center">
        <h2 className="flex ml-4 justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">
          Existing Showings
        </h2>
        <div className="overflow-y-auto flex-1 w-full">
          {showings.length > 0 ? (
            <table className="min-w-full">
              <thead>
              <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Showing Time
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Extras
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Movie ID
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Cinema Hall ID
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Seat Price
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Je nach dem was wir angezeigt haben wollen. Vllt Id auch?  */}
              <tbody>
                {showings.map((showing) => (
                  <tr key={showing.id} className="h-24 border-gray-300 border-b">
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.time}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.showingExtras}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.movieId}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.cinemaHallId}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.seatPrice}
                    </td>
                    <td className="text-sm">
                      <button
                        onClick={() => handleDeleteShowing(showing.id)}
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
            <p className="text-white">No showings available.</p>
          )}
        </div>
        <button
          onClick={continueAddShowing}
          className="my-3 transition duration-300 ease-in-out font-normal py-3 px-6 rounded-lg bg-accent-40 text-white"
        >
          Add Showing
        </button>
      </div>
    </div>
  );
};

export default AddShowing;
