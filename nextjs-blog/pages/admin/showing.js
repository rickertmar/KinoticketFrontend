import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddShowing = ({ handleItemClick }) => {
  const [showings, setShowings] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch showings data
      axios
        .get(process.env.API_URL + "/showings", {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 405;
          },
        })
        .then((response) => {
          setShowings(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching showings data:", error);
        });
    }
  }, []);

  // Add API DELETE request here to remove the showing from the database
  const handleDeleteShowing = (showingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this showing?"
    );
    if (confirmDelete) {
      console.log("selected id" + showingId);
      axios
        .delete(`${process.env.API_URL}/showings/${showingId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((response) => {
          // If the deletion was successful, update the local showings list
          // Assuming you have a state called `showings` and a setter `setShowings`
          setShowings((prevShowings) =>
            prevShowings.filter((showing) => showing.id !== showingId)
          );
        })
        .catch((error) => {
          console.error("Error deleting showing:", error);
          alert("Failed to delete the showing. Please try again.");
        });
    }
  };

  const continueAddShowing = () => {
    handleItemClick("addshowing");
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
                    Title
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Seat Price
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {showings.map((showing) => (
                  <tr
                    key={showing.id}
                    className="h-24 border-gray-300 border-b"
                  >
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.time}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.showingExtras}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.movie.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {showing.movie.title}
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
