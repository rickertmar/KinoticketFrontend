import React, { useState, useEffect } from 'react';

function Seat({ id, number, isAvailable, selected, onClick }) {
  const seatStyles = {
    cursor: isAvailable ? 'pointer' : 'not-allowed',
    backgroundColor: isAvailable
      ? selected
        ? 'red'
        : 'green'
      : 'gray',
    color: 'white',
    borderRadius: '8px',
    padding: '8px',
    textAlign: 'center',
    width: '40px',
    height: '40px',
  };

  return (
    <div
      onClick={() => {
        if (isAvailable) {
          onClick(id);
        }
      }}
      style={seatStyles}
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
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 mt-4">Select Your Seats</h2>
      <div className="flex justify-center items-center w-full h-20 mb-4">
        <div
          className="w-3/5 h-1 bg-black"
          style={{ backgroundColor: 'black' }} // You can adjust the color here
        ></div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-8 gap-4"> {/* Adjust the number of columns here */}
          {seatsData.map((seat) => (
            <Seat
              key={seat.id}
              id={seat.id}
              number={seat.number}
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
