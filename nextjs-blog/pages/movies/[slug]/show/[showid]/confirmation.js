import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ConfirmationPage() {
  const router = useRouter();
  const { ticketTypes, totalPrice, showid, selectedSeatsId, seatData  } = router.query;
  const parsedSeats = JSON.parse(seatData)

  const handlePaymentSubmit = () => {
    
    const accessToken = Cookies.get("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.post(process.env.API_URL + '/reservation', {selectedSeatIdList: JSON.parse(selectedSeatsId),
      studentDiscounts: JSON.parse(ticketTypes).Student,
      childDiscounts: JSON.parse(ticketTypes).Child,
      noDiscounts: JSON.parse(ticketTypes).Regular,
      showingId: parseInt(showid, 10),}, {headers:{ 'Content-Type': 'application/json'}}).then(()=>{
      alert('Payment submitted')
      router.push("/")
    }
    )
  };

  const handleCancel = () => {
    router.back();
  };
  const selectedSeats = parsedSeats.filter((seat) => selectedSeatsId.includes(seat.id));
  selectedSeats.sort((a, b) => {
    if (a.seatRow < b.seatRow) return -1;
    if (a.seatRow > b.seatRow) return 1;
    // If seatRow is the same, sort by seat number
    if (a.number < b.number) return -1;
    if (a.number > b.number) return 1;
    return 0;
  });
  const seatDescriptions = selectedSeats.map((seat) => `${seat.seatRow}${seat.number}`);

  // Join the seat descriptions with a separator (e.g., a comma and space)
  const seatsText = seatDescriptions.join(', ');
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <main className="bg-primary-20 mt-5 text-white">
        <div className="flex flex-row flex-nowrap max-w-7xl mx-auto p-6 text-white">
          <div className="flex flex-col w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center w-full">
              Payment for Movie: test
              <div>
                Showtime: 10.03.2023 - 19:00
              </div>
            </h2>
            <div className="mb-4 w-full">
              <h3 className="text-xl font-bold mb-2">
                Selected Seats and Types
              </h3>
              <div>
                Seats: {seatsText}
              </div>
              <div>
                Regular: {ticketTypes ? JSON.parse(ticketTypes).Regular : 0}, 
                Student: {ticketTypes ? JSON.parse(ticketTypes).Student : 0}, 
                Child: {ticketTypes ? JSON.parse(ticketTypes).Child : 0}
              </div>
              <div>
                Total Price: {totalPrice}€
              </div>
            </div>
  
            <div className="mb-4 w-full flex justify-between flex-wrap">
                <button onClick={handlePaymentSubmit}
                  className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg mb-4 bg-accent-40"
                >
                  Submit Payment
                </button>
              <button
                onClick={handleCancel}
                className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg mb-4 bg-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
