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

  const groupSeatsByRow = (seatsData) => {
    const groupedSeats = {};
    seatsData.forEach((seat) => {
      if (!groupedSeats[seat.row]) {
        groupedSeats[seat.row] = [];
      }
      groupedSeats[seat.row].push(seat);
    });
    return groupedSeats;
  };

  const renderSeatsByRow = (groupedSeats) => {
    const rows = Object.keys(groupedSeats);
    const maxRowLength = Math.max(...rows.map((row) => groupedSeats[row].length));

    return (
      <div className="grid grid-cols-2 gap-4">
        {rows.map((row) => (
          <div key={row} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{row}-Row</h3>
            <div className="flex flex-wrap gap-4">
              {groupedSeats[row].map((seat) => (
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
            
              {Array(maxRowLength - groupedSeats[row].length)
                .fill()
                .map((_, index) => (
                  <div key={index} className="p-3 border bg-gray-300 cursor-not-allowed rounded-lg"></div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const groupedSeats = groupSeatsByRow(seatsData);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
      <div className="bg-white p-8 rounded-lg shadow-md relative">
   
        <div className="w-full h-8 bg-black flex justify-center items-center text-white">Screen</div>
        {renderSeatsByRow(groupedSeats)}
        <div className="mt-4">
          <p className="text-gray-600">
            Selected Seats: {selectedSeats.map((seatId) => seatsData.find((seat) => seat.id === seatId).number).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
