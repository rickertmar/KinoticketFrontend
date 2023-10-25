import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const router = useRouter();
  const { totalSeats, ticketTypes, totalPrice, showid, slug, selectedSeats } = router.query;
  const [parsedSeats, setParsedSeats] = useState([]);
  const [seatIdToInfo, setSeatIdToInfo] = useState({});

 

  useEffect(() => {
    if (selectedSeats) {
      setParsedSeats(JSON.parse(selectedSeats));
    }
  }, [selectedSeats]);


  const formatSlugToTitle = (slug) => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handlePaymentSubmit = () => {
    alert('Payment submitted');
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

  const formattedSeats = parsedSeats.map((seatId) => {
    const info = seatIdToInfo[seatId];
    return info ? `${info.seatRow}${info.number}` : seatId;
  }).join(', ');

  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <main className="bg-primary-20 mt-5 text-white">
        <div className="flex flex-row flex-nowrap max-w-7xl mx-auto p-6 text-white">
          <div className="flex flex-col w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center w-full">
              Payment for Movie: {slug ? formatSlugToTitle(slug) : 'Unknown Movie'}
              <div>
                Showtime: 10.03.2023 - 19:00
              </div>
            </h2>
            <div className="mb-4 w-full">
              <h3 className="text-xl font-bold mb-2">
                Selected Seats and Types
              </h3>
              <div>
                Total Seats: {totalSeats} - {formattedSeats}
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
              <form onSubmit={handlePaymentSubmit} className="w-full">
                <button
                  type="submit"
                  className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg mb-4 bg-accent-40"
                >
                  Submit Payment
                </button>
              </form>
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
