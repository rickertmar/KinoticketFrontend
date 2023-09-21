import React, { useEffect, useState, useRef } from 'react';
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

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
    }
  
    return jsonData;
  }
  const seatData = generateJsonData()
  function SeatGrid() {
    
    /*const seatData = [
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
      <div className='flex flex-col mt-10 items-center'>
        <div className="cursor-default border-2 border-neutral-300">
        <TransformWrapper initialScale={1} maxScale={1.5} minScale={0.95}>
        <TransformComponent>
          <div id="seatsGrid" className="grid text-white gap-2 cursor-default p-10 ">
            {seatData.map((seat) => {
              const gridRow = seat.yloc;
              const gridColumn = seat.xloc;
              return (
                <div
                  className='relative'
                  style={{
                    gridRowStart: gridRow,
                    gridColumnStart: gridColumn,
                  }}
                  key={seat.id}
                  id={seat.id}
                >
                  
                  <button
                    className={
                      selectedSeats.includes(seat.id)
                        ? 'bg-accent-50 h-2 w-2 md:h-3 md:w-3 lg:w-4 lg:h-4 xl:h-5 xl:w-5'
                        : 'h-2 w-2 md:h-3 md:w-3 lg:w-4 lg:h-4 xl:h-5 xl:w-5 bg-neutral-400  disabled:bg-neutral-800'
                    }
                    onClick={() => toggleSeat(seat.id)}
                    disabled={seat.blocked}
                  ></button>
                  {gridColumn === 1 && (
                  <div className="text-white text-xs absolute right-8 top-[0.55rem] ">{seat.seatRow}</div>
                )}
                  </div>
              );
            })}
          </div>
        </TransformComponent>
          
      </TransformWrapper>
        </div>
      
    </div>
    );
  }
  
  export default SeatGrid;
