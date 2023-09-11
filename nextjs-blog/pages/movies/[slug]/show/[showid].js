import React, { useState, useEffect } from 'react';

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

  const seatStyle = {
    width: '20px', // Adjust the width as needed
    height: '20px', // Adjust the height as needed
    fontSize: '10px', // Adjust the font size as needed
  };

  const screenStyle = {
    backgroundColor: 'black',
    height: '20px',
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Select Your Seats</h2>
        <div className="bg-black h-5 mb-4">
          <div className="text-white text-center">Screen</div>
        </div> {/* Black screen */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {Array.from({ length: 21 }, (_, rowIndex) => (
                <>
                  <tr key={rowIndex}>
                    <th className="text-right pr-2">{String.fromCharCode(65 + rowIndex)}</th>
                    {Array.from({ length: 10 }, (_, seatIndex) => {
                      const seat = seatsData.find(
                        (seat) => seat.seatRow === String.fromCharCode(65 + rowIndex) && seat.number === seatIndex + 1
                      );

                      const isAvailable = seat ? !seat.blocked : false;

                      return (
                        <td key={seatIndex} className="p-2">
                          {seat && (
                            <div
                              style={{
                                ...seatStyle,
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                backgroundColor: isAvailable ? (selectedSeats.includes(seat.id) ? 'red' : 'green') : 'gray',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative', 
                              }}
                              className={`border rounded-lg text-center`}
                              onClick={() => toggleSeat(seat.id)}
                            >
                              {seat.number}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="w-5"></td>
                    {Array.from({ length: 10 }, (_, seatIndex) => {
                      const seat = seatsData.find(
                        (seat) => seat.seatRow === String.fromCharCode(65 + rowIndex) && seat.number === seatIndex + 11
                      );

                      const isAvailable = seat ? !seat.blocked : false;

                      return (
                        <td key={seatIndex + 10} className="p-2">
                          {seat && (
                            <div
                              style={{
                                ...seatStyle,
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                backgroundColor: isAvailable ? (selectedSeats.includes(seat.id) ? 'red' : 'green') : 'gray',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative', 
                              }}
                              className={`border rounded-lg text-center`}
                              onClick={() => toggleSeat(seat.id)}
                            >
                              {seat.number === 11 ? 11 : seat.number}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {/*Walkway: empty row between J and K */}
                  {String.fromCharCode(65 + rowIndex) === 'J' && (
                    <tr key={`empty-row-${rowIndex}`}>
                      <td colSpan="21" className="h-5"></td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
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
