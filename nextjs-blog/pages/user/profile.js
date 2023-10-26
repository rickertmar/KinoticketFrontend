import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [reservedTickets, setReservedTickets] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch user data
      axios
        .get(process.env.API_URL + "/users", {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Fetch reserved tickets for the user
      axios
        .get(process.env.API_URL + "/reservation/getUserReservations", {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setReservedTickets(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reserved tickets:", error);
        });
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen my-3">
      <div className="rounded-3xl pt-20 w-full max-w-l h-64 flex flex-1 flex-col bg-primary-20 items-center">
        <h2 className="flex justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">
          User Profile
        </h2>

        {userData ? (
          <div className="space-y-4 w-full text-white">
            <div className="flex flex-col justify-center items-center">
              <label className="block text-sm font-medium">Email:</label>
              <p className="mt-1">{userData.email}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="block text-sm font-medium">First Name:</label>
              <p className="mt-1">{userData.first_name}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="block text-sm font-medium">Last Name:</label>
              <p className="mt-1">{userData.last_name}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Address ??{" "}
              </h2>
              {/* You can add the shipping address details here */}
            </div>

            {/* You can add the Reservation and related Information about User here? */}
            <div className="mt-4">
              <h3 className="flex justify-center items-center text-l text-accent-50 font-semibold mb-2">
                Reserved Tickets:
              </h3>
              {reservedTickets.map((ticket) => (
                <div key={ticket.id} className="mb-4">
                  <p>
                    <strong>Movie Title:</strong> {ticket.movietitle}
                  </p>
                  <p>
                    <strong>Username:</strong> {ticket.username}
                  </p>
                  <p>
                    <strong>Showing Start:</strong> {ticket.showingStart}
                  </p>
                  <p>
                    <strong>Showing Extras:</strong> {ticket.showingExtras}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${ticket.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full text-white">
            <span>Loading user data...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
