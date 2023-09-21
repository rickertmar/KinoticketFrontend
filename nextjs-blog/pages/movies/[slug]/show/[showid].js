<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const router = useRouter();

  const navigateToTicketSelection = () => {
    router.push({
      pathname: `/movies/${router.query.slug}/show/${router.query.showid}/ticketselection`,
      query: { selectedSeats: JSON.stringify(selectedSeats) }, 
    });
  };
  
  
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
=======
import React, { useEffect, useState } from 'react';
function generateJsonData() {
    const jsonData = [];
    let id = 1;
    var xloc = 0
    var yloc = 0
    for (let seatRow = 1; seatRow <= 15; seatRow++) {
        yloc+=0
        xloc = 0
      for (let number = 1; number <= 35; number++) {
        xloc+=1
        const blocked = Math.random() < 0.1;
        if(seatRow >= 1 && seatRow <17 && number === 34){
            xloc+=1
        }
        const seatData = {
          id: id++,
          seatRow,
          number,
          xloc,
          yloc,
          blocked,
        };
  
        jsonData.push(seatData);
      }
>>>>>>> Stashed changes
    }
  
    return jsonData;
  }
  const seatData = generateJsonData()
  function SeatGrid() {
    /*
    const seatData = [
        {
            "id": 1,
            "seatRow": "A",
            "number": 1,
            "xloc": 1,
            "yloc": 2,
            "blocked": true
        },
        {
            "id": 2,
            "seatRow": "A",
            "number": 2,
            "xloc": 2,
            "yloc": 2,
            "blocked": true
        },
        {
            "id": 3,
            "seatRow": "A",
            "number": 3,
            "xloc": 3,
            "yloc": 2,
            "blocked": true
        },
    ]
    */

    const cols = Math.max(...seatData.map(seat => seat.xloc));
    const rows = Math.max(...seatData.map(seat => seat.yloc));
    const [selectedSeats, setSelectedSeats] = useState([]);
    
    console.log(rows + "" + cols)
    function setDynamicColumns(cols) {
        document
          .querySelector('#seatsGrid')
          .style['grid-template-columns'] = `repeat(${cols}, minmax(0, 1fr))`
      }
    function setDynamicRows(rows) {
    document
        .querySelector('#seatsGrid')
        .style['grid-template-rows'] = `repeat(${rows}, minmax(0, 1fr))`
    }
    const toggleSeat = (seatId) => {
        const isSelected = selectedSeats.includes(seatId);
        if (isSelected) {
          setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
          setSelectedSeats([...selectedSeats, seatId]);
        }
      };
  useEffect(()=>{
    setDynamicColumns(cols)
    setDynamicRows(rows)
  })
    return (
        <div className='mt-4'>
            <div id="seatsGrid" className="grid text-white gap-2">
                {seatData.map(seat => {
                const gridRow = seat.yloc;
                const gridColumn = seat.xloc;

                return (
                    <div className=''
                    style={{
                        gridRowStart: gridRow,
                        gridColumnStart: gridColumn,
                        }}
                        key={seat.id}
                        id={seat.id}>         
                        <button className={selectedSeats.includes(seat.id)? 'bg-neutral-300 h-5 w-5  peer-checked:bg-neutral-700': "h-5 w-5 bg-neutral-700  disabled:bg-neutral-500"}
                        onClick={(()=>toggleSeat(seat.id))}
                        disabled={seat.blocked}
                        >
                            
                        </button>
                    </div>
                    
                
                );
            })}

            </div>
        </div>
<<<<<<< Updated upstream
        <div className="mt-4">
          <p className="text-gray-600">
            Selected Seats: {selectedSeats.map((seatId) => {
              const seat = seatsData.find((seat) => seat.id === seatId);
              return `${seat.seatRow.toUpperCase()} ${seat.number}`;
            }).join(', ')}
          </p>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={selectedSeats.length === 0}
            onClick={navigateToTicketSelection}
          >
            Proceed to Ticket Selection
          </button>
        </div>
      </div>
    </div>
  );
}
=======
     
    );
  }
  
  export default SeatGrid;
>>>>>>> Stashed changes
