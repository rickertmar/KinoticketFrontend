import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function TicketSelection() {
  const [ticketTypes, setTicketTypes] = useState({});
  const [seatIdToInfo, setSeatIdToInfo] = useState({});
  const router = useRouter();
  const { selectedSeats, showid, slug } = router.query;
  const parsedSeats = JSON.parse(selectedSeats || '[]');

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

  const handleCancel = () => {
    router.back();
  };

  const handlePayment = () => {
    const selectedSeatsList = Object.keys(ticketTypes).map((seatId) => {
      const seatInfo = seatIdToInfo[seatId];
      const seatStr = seatInfo ? `${seatInfo.seatRow}${seatInfo.number}` : `ID ${seatId}`;
      return `Seat ${seatStr} (${ticketTypes[seatId]})`;
    }).join(', ');

    router.push({
      pathname: `/movies/${router.query.slug}/show/${router.query.showid}/confirmation`,
      query: {
        selectedSeats: JSON.stringify(parsedSeats),
        ticketTypes: JSON.stringify(ticketTypes),
        showid: showid,
        slug: slug
      }
    });
  };
  

  

  const setTicketTypeForSeat = (seat, type) => {
    setTicketTypes({
      ...ticketTypes,
      [seat]: type,
    });
  };

  return (
    <>
      <Head>
        <title>Select your ticket type</title>
      </Head>
      <main style={{ backgroundColor: '#EBEBEB' }} className="mt-5">
        <div className="flex flex-row flex-nowrap max-w-7xl mx-auto p-6">
          <div className="flex flex-col w-full">
            <h2 style={{ color: '#2D3339' }} className="text-3xl font-semibold mb-4 text-center w-full">Select your ticket type</h2>
  
            {parsedSeats.map((seatId, index) => (
              <div key={index} className="mb-4 w-full">
                <label style={{ color: '#2D3339' }} className="block font-bold mb-2">
                  {seatIdToInfo[seatId] ? 
                    `Ticket Type for Seat ${seatIdToInfo[seatId].seatRow}${seatIdToInfo[seatId].number}` : 
                    `Ticket Type for Seat ID ${seatId}`
                  }
                </label>
                <select
                  style={{ borderColor: '#90DDF0' }}
                  className="w-full p-3 rounded-lg focus:outline-none"
                  value={ticketTypes[seatId] || ''}
                  onChange={(e) => setTicketTypeForSeat(seatId, e.target.value)}
                >
                  <option value="" disabled>Select ticket type</option>
                  <option value="Student">Student</option>
                  <option value="Child">Child</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
            ))}
            
            <div className="text-center w-full">
              <button
                style={{ backgroundColor: '#90DDF0', color: '#2D3339' }}
                className={`transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg ${
                  parsedSeats.some((seatId) => !ticketTypes[seatId]) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={parsedSeats.some((seatId) => !ticketTypes[seatId])}
                onClick={handlePayment}
              >
                Proceed to Payment
              </button>
            </div>

            <div className="text-center w-full">
              <button
                onClick={handleCancel}
                style={{ backgroundColor: '#FF8383', color: '#2D3339' }}
                className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg mt-4"
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