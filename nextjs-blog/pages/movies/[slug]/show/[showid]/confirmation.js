import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const router = useRouter();
  const { selectedSeats, ticketTypes, showid, slug } = router.query;
  const ticketTypeToNumericPrice = (type) => {
    switch (type) {
      case 'Student':
        return 8;
      case 'Child':
        return 6;
      case 'Regular':
        return 10;
      default:
        return 0;
    }
  };
  const calculateTotalPrice = () => {
    return Object.values(parsedTicketTypes).reduce((sum, type) => sum + ticketTypeToNumericPrice(type), 0);
  };
  const ticketTypeToPrice = (type) => {
    switch (type) {
      case 'Student':
        return '8€';
      case 'Child':
        return '6€';
      case 'Regular':
        return '10€';
      default:
        return 'Unknown Price';
    }
  };
  const formatSlugToTitle = (slug) => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const [parsedSeats, setParsedSeats] = useState([]);
  const [parsedTicketTypes, setParsedTicketTypes] = useState({});
  const [seatIdToInfo, setSeatIdToInfo] = useState({});

  useEffect(() => {
    fetch('/seatsData.json')
      .then((response) => response.json())
      .then((seatsData) => {
        const newSeatIdToInfo = {};
        seatsData.forEach((seat) => {
          newSeatIdToInfo[seat.id] = { seatRow: seat.seatRow, number: seat.number };
        });
        setSeatIdToInfo(newSeatIdToInfo);
      });
  }, []);

  useEffect(() => {
    if (selectedSeats) {
      setParsedSeats(JSON.parse(selectedSeats));
    }
    if (ticketTypes) {
      setParsedTicketTypes(JSON.parse(ticketTypes));
    }
  }, [selectedSeats, ticketTypes]);

  const handlePaymentSubmit = () => {
    alert('Payment submitted');
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

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
                Showtime: N/A
              </div>
            </h2>
            <div className="mb-4 w-full">
              <h3 className="text-xl font-bold mb-2">
                Selected Seats and Types
              </h3>
              <ul>
                {parsedSeats.map((seatId, index) => (
                  <li key={index}>
                    {seatIdToInfo[seatId]
                      ? `Seat ${seatIdToInfo[seatId].seatRow}${seatIdToInfo[seatId].number}: ${parsedTicketTypes[seatId] || 'Unknown Type'} - ${ticketTypeToPrice(parsedTicketTypes[seatId])}`
                      : `Seat ID ${seatId}: ${parsedTicketTypes[seatId] || 'Unknown Type'} - ${ticketTypeToPrice(parsedTicketTypes[seatId])}`
                    }
                  </li>
                ))}
              </ul>
              <br />
              <div>
                Total Price: {calculateTotalPrice()}€
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