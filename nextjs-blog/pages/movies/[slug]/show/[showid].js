import React, { useState, useEffect } from 'react';

function Seat({ id, number, row, isAvailable, selected, onClick }) {
  return (
    <div
      onClick={() => {
        if (isAvailable) {
          onClick(id);
        }
      }}
      className={`p-3 border ${
        isAvailable
          ? selected
            ? 'bg-red-500 text-white cursor-not-allowed'
            : 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      } rounded-lg text-center`}
    >
      {number}
    </div>
  );
}

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsData, setSeatsData] = useState([]);

  useEffect(() => {
    // Fetch the seat data from the JSON file
    fetch('/seatsData.json') 
      .then((response) => response.json())
      .then((data) => setSeatsData(data))
      .catch((error) => console.error('Error fetching seat data:', error));
  }, []);

  const toggleSeat = (seatId) => {
    const isSelected = selectedSeats.includes(seatId);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
        <div className="grid grid-cols-5 gap-4">
          {seatsData.map((seat) => (
            <Seat
              key={seat.id}
              id={seat.id}
              number={seat.number}
              row={seat.row}
              isAvailable={seat.available}
              selected={selectedSeats.includes(seat.id)}
              onClick={toggleSeat}
            />
          ))}
        </div>
        <div className="mt-4">
          <p className="text-gray-600">
            Selected Seats: {selectedSeats.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
