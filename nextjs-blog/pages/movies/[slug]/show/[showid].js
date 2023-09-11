import React, { useState, useEffect } from 'react';

function Seat({ id, number, seatRow, isAvailable, selected, onClick, xloc, yloc }) {
  const style = {
    position: 'relative',
    left: `${xloc}px`,
    top: `${yloc}px`,
    width: '20px', // Adjust the width as needed
    height: '20px', // Adjust the height as needed
    fontSize: '10px', // Adjust the font size as needed
  };

  return (
    <div
      onClick={() => {
        if (isAvailable) {
          onClick(id);
        }
      }}
      style={style}
      className={`p-1 border ${
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
      if (!groupedSeats[seat.seatRow]) {
        groupedSeats[seat.seatRow] = [];
      }
      groupedSeats[seat.seatRow].push(seat);
    });
    return groupedSeats;
  };

  const renderSeatsByRow = (groupedSeats) => {
    const rowLabels = Object.keys(groupedSeats); // Get all row labels
    const maxRowLength = Math.max(...rowLabels.map((row) => groupedSeats[row].length));
    const numRows = rowLabels.length;

    // Reduce the number of columns to 12
    const numCols = 12; // Reducing the number of columns to 12

    return (
      <div className="relative">
        <div className={`grid grid-cols-${numCols} gap-2`}>{/* Reduce the number of columns */}
          {rowLabels.map((row, index) => (
            <React.Fragment key={row}>
              <div className="flex justify-start items-center">
                <h3 className="text-lg font-semibold mr-2">{row}</h3>
                <div className="flex flex-wrap gap-2">
                  {groupedSeats[row].map((seat) => (
                    <Seat
                      key={seat.id}
                      id={seat.id}
                      number={seat.number}
                      seatRow={seat.seatRow}
                      isAvailable={seat.blocked ? false : true}
                      selected={selectedSeats.includes(seat.id)}
                      onClick={toggleSeat}
                      xloc={seat.xloc}
                      yloc={seat.yloc}
                    />
                  ))}
                </div>
              </div>
             
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const groupedSeats = groupSeatsByRow(seatsData);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
    <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
    <div className="bg-white p-16 rounded-lg shadow-md" style={{ width: '90%', height: '80%'}}>

      <div className="w-full h-8 bg-black flex justify-center items-center text-white">Screen</div>
      <div className="mb-4">
        {/* Spacer with width */}
        <div className="w-5" />
        
      </div>
      {renderSeatsByRow(groupedSeats)}
      <div className="mt-4">
        <p className="text-gray-600">
          Selected Seats: {selectedSeats.map((seatId) => {
            const seat = seatsData.find((seat) => seat.id === seatId);
            return `${seat.seatRow.toUpperCase()} ${seat.number}`;
          }).join(', ')}
        </p>
      </div>
    </div>
  </div>
  );
}
