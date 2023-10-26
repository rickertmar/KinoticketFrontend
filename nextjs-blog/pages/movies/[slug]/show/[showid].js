import React, { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/router";
import LoginDialouge from "../../../../components/loginDialogue";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

function generateJsonData() {
  const jsonData = [];
  let id = 1;
  var xloc = 0;
  var yloc = 0;
  for (let seatRow = 1; seatRow <= 15; seatRow++) {
    yloc += 0;
    xloc = 0;
    for (let number = 1; number <= 24; number++) {
      xloc += 1;
      const blocked = Math.random() < 0.1;
      if (seatRow >= 1 && seatRow < 17 && number === 15) {
        xloc += 1;
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
export const findSeatById = (id) => {
  const seat = seatData.find((seat) => seat.id === id);
  const rowLetter = String.fromCharCode(64 + parseInt(seat.seatRow));
  return seat ? `${rowLetter}${seat.number}` : null;
};
const seatData = generateJsonData();
function SeatGrid({ isAuthenticated }) {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [attemptedToPay, setAttemptedToPay] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState({
    Regular: selectedSeats.length,
    Student: 0,
    Child: 0,
  });


  const [seatIdToInfo, setSeatIdToInfo] = useState({});
  const [arrayChanged, setArrayChanged] = useState(false)

  const handleCancel = () => {
    router.back();
  };
  useEffect(() => {
    let timer;
    setArrayChanged(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (arrayChanged) {
        //send request to server to block seats
        console.log("Running your logic..." + selectedSeats);
        //update seats
        setArrayChanged(false);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [selectedSeats]);
  useEffect(() => {
    setTicketTypes((prevTicketTypes) => ({
      ...prevTicketTypes,
      Regular: selectedSeats.length,
      Student: 0,
      Child: 0,
    }));
  }, [selectedSeats]);

  const handlePayment = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      setAttemptedToPay(true);
      return;
    }
    const totalSeats = selectedSeats.length;
    const totalPrice =
      ticketTypes.Regular * 10 +
      ticketTypes.Student * 8 +
      ticketTypes.Child * 6;
    router.push({
      pathname: `/movies/${router.query.slug}/show/${router.query.showid}/confirmation`,
      query: {
        totalSeats: totalSeats,
        ticketTypes: JSON.stringify(ticketTypes),
        totalPrice: totalPrice,
        showid: showid,
        slug: slug,
        selectedSeats: JSON.stringify(selectedSeats),
      },
    });
  };
  useEffect(() => {
    if (isAuthenticated && attemptedToPay) {
      const totalSeats = selectedSeats.length;
      const totalPrice =
        ticketTypes.Regular * 10 +
        ticketTypes.Student * 8 +
        ticketTypes.Child * 6;
      router.push({
        pathname: `/movies/${router.query.slug}/show/${router.query.showid}/confirmation`,
        query: {
          totalSeats: totalSeats,
          ticketTypes: JSON.stringify(ticketTypes),
          totalPrice: totalPrice,
          showid: showid,
          slug: slug,
          selectedSeats: JSON.stringify(selectedSeats),
        },
      });
      setAttemptedToPay(false);
    }
  }, [isAuthenticated, attemptedToPay]);

  const adjustTicketTypeCount = (type, delta) => {
    const newCount = Math.max(0, ticketTypes[type] + delta);
    let totalTickets =
      Object.values(ticketTypes).reduce((a, b) => a + b, 0) -
      ticketTypes[type] +
      newCount;

    if (totalTickets <= selectedSeats.length) {
      if (
        type !== "Regular" &&
        delta < 0 &&
        ticketTypes.Regular + 1 <= selectedSeats.length
      ) {
        setTicketTypes({
          ...ticketTypes,
          [type]: newCount,
          Regular: ticketTypes.Regular + 1,
        });
      } else {
        setTicketTypes({
          ...ticketTypes,
          [type]: newCount,
        });
      }
    } else {
      if (type === "Regular") {
        for (const otherType of ["Student", "Child"]) {
          if (ticketTypes[otherType] > 0) {
            setTicketTypes({
              ...ticketTypes,
              [type]: newCount,
              [otherType]: ticketTypes[otherType] - 1,
            });
            return;
          }
        }
      } else {
        if (ticketTypes.Regular > 0) {
          setTicketTypes({
            ...ticketTypes,
            [type]: newCount,
            Regular: ticketTypes.Regular - 1,
          });
        } else {
          const otherType = type === "Student" ? "Child" : "Student";
          if (ticketTypes[otherType] > 0) {
            setTicketTypes({
              ...ticketTypes,
              [type]: newCount,
              [otherType]: ticketTypes[otherType] - 1,
            });
          }
        }
      }
    }
  };

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

  const cols = Math.max(...seatData.map((seat) => seat.xloc));
  const rows = Math.max(...seatData.map((seat) => seat.yloc));
  const { showid, slug } = router.query;
  const navigateToTicketSelection = () => {
    router.push({
      pathname: `/movies/${router.query.slug}/show/${router.query.showid}/ticketselection`,
      query: {
        selectedSeats: JSON.stringify(selectedSeats),
      },
    });
  };
  function setDynamicColumns(cols) {
    document.querySelector("#seatsGrid").style[
      "grid-template-columns"
    ] = `repeat(${cols}, minmax(0, 1fr))`;
  }
  function setDynamicRows(rows) {
    document.querySelector("#seatsGrid").style[
      "grid-template-rows"
    ] = `repeat(${rows}, minmax(0, 1fr))`;
  }
  const toggleSeat = (seatId) => {
    const isSelected = selectedSeats.includes(seatId);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  useEffect(() => {
    setDynamicColumns(cols);
    setDynamicRows(rows);
  });

  return (
    <div className="bg-primary-30 text-white mt-10 xl:text-2xl">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex bg-primary-20 cursor-default border-2 border-neutral-300 w-full justify-center sm:w-2/3 shrink-0 ">
          <TransformWrapper maxScale={1.5} minScale={0.5} doubleClick={false}>
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{}}
            >
              <div
                id="seatsGrid"
                className="grid text-white gap-2 cursor-default shrink-0"
              >
                {seatData.map((seat) => {
                  const gridRow = seat.yloc;
                  const gridColumn = seat.xloc;
                  return (
                    <div
                      className="relative"
                      style={{
                        gridRowStart: gridRow,
                        gridColumnStart: gridColumn,
                        gap: "25px",
                      }}
                      key={seat.id}
                      id={seat.id}
                    >
                      <button
                        className={
                          selectedSeats.includes(seat.id)
                            ? "h-3 w-3 bg-accent-40"
                            : "h-3 w-3 bg-neutral-300 disabled:bg-primary-40"
                        }
                        onClick={() => toggleSeat(seat.id)}
                        disabled={seat.blocked}
                      ></button>

                      {gridColumn === 1 && (
                        <div className="text-white text-xs absolute right-8 top-[0.3rem] ">
                          {seat.seatRow}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>

        <>
          <div className="flex flex-col justify-between py-6 pr-2 flex-grow mt-8 mb-8 sm:w-1/3 sm:ml-4">
            <h2 className="text-3xl lg:text-2xl xl:text-4xl sm:text-xl font-semibold mb-4 text-center w-full">
              Select your ticket type
            </h2>
            {[
              { label: "Regular 10€", type: "Regular" },
              { label: "Student 8€", type: "Student" },
              { label: "Child 6€", type: "Child" },
            ].map(({ label, type }) => (
              <div key={type} className="mb-4 w-full text-center">
                <label className="block font-bold mb-2">{label}</label>
                <button
                  onClick={() => adjustTicketTypeCount(type, -1)}
                  className={`px-2 py-1 rounded-l text-white ${
                    ticketTypes[type] === 0 || type === "Regular"
                      ? "bg-accent-20"
                      : "bg-accent-40"
                  }`}
                  disabled={ticketTypes[type] === 0 || type === "Regular"}
                >
                  -
                </button>

                <span className="px-4">{ticketTypes[type]}</span>
                <button
                  onClick={() => adjustTicketTypeCount(type, 1)}
                  className="bg-accent-40 text-white px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            ))}

            <div className="text-center w-full">
              <button
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
                className={`transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg ${
                  selectedSeats.length === 0 ? "bg-accent-20" : "bg-accent-40"
                }`}
              >
                Proceed to Payment
              </button>
            </div>

            <div className="text-center w-full mt-4">
              <button
                onClick={handleCancel}
                className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg bg-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      </div>
      <LoginDialouge open={isLoginOpen} setOpen={setIsLoginOpen} />
    </div>
  );
}

export default SeatGrid;

