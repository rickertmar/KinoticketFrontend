import React, { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/router";
import LoginDialouge from "../../../../components/loginDialogue";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import axios from "axios";

function SeatGrid({isAuthenticated}) {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [attemptedToPay, setAttemptedToPay] = useState(false);
  const [selectedSeatsId, setselectedSeatsId] = useState([]);
  const [seatData, setSeatData] = useState([])
  const [ticketTypes, setTicketTypes] = useState({
    Regular: selectedSeatsId.length,
    Student: 0,
    Child: 0,
  })
  const handleCancel = () => {
    router.back();
  };
  useEffect(()=>{
    const id = router.asPath.match(/(\d+)(?!.*\d)/);
    const lastNumber = id ? id[0] : null;
      axios.get(process.env.API_URL+'/showings/'+ lastNumber + "/get-seats", { headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status >= 200 && status <= 302;
      },})
        .then(response => {
          const seatList = response.data.map((seat)=>{
            console.log(seat.xloc)
            return{
              id: seat.id,
              yloc: seat.yloc/10,
              xloc: seat.xloc/10,
              blocked: seat.blocked,
              seatRow: seat.seatRow,
              number: seat.number
            }
        }
        )
        console.log(seatList)
        setSeatData(seatList)
      })

  }, [])
  useEffect(() => {
    setTicketTypes((prevTicketTypes) => ({
      ...prevTicketTypes,
      Regular: selectedSeatsId.length,
      Student: 0,
      Child: 0,
    }));
  }, [selectedSeatsId]);

  const handlePayment = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      setAttemptedToPay(true);
      return;
    }
    const totalSeats = selectedSeatsId.length;
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
        selectedSeatsId: JSON.stringify(selectedSeatsId),
        seatData: JSON.stringify(seatData),
      },
    });
  };

  const adjustTicketTypeCount = (type, delta) => {
    const newCount = Math.max(0, ticketTypes[type] + delta);
    let totalTickets =
      Object.values(ticketTypes).reduce((a, b) => a + b, 0) -
      ticketTypes[type] +
      newCount;

    if (totalTickets <= selectedSeatsId.length) {
      if (
        type !== "Regular" &&
        delta < 0 &&
        ticketTypes.Regular + 1 <= selectedSeatsId.length
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

  const cols = Math.max(...seatData.map((seat) => seat.xloc));
  const rows = Math.max(...seatData.map((seat) => seat.yloc));
  
  const {showid, slug } = router.query;
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
    const isSelected = selectedSeatsId.includes(seatId);
    if (isSelected) {
      setselectedSeatsId(selectedSeatsId.filter((id) => id !== seatId));
    } else {
      setselectedSeatsId([...selectedSeatsId, seatId]);
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
            {({ setTransform }) => (
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{}}
              >
                <div
                  id="seatsGrid"
                  className="grid text-white cursor-default shrink-0 justify-items-center align-items-center"
                >
                  <div
                    className="text-center text-white py-1"
                    style={{ gridColumn: `1 / ${cols + 1}` }}
                  >
                    ---------Screen---------
                  </div>

                  {seatData.map((seat) => {
                    const gridRow = seat.yloc;
                    const gridColumn = seat.xloc;
                    return (
                      <div
                        className="relative"
                        style={{
                          gridRowStart: gridRow,
                          gridColumnStart: gridColumn,
                        }}
                        key={seat.id}
                        id={seat.id}
                      >
                        <button
                          className={
                            selectedSeatsId.includes(seat.id)
                              ? "h-3 w-3 bg-accent-40"
                              : "h-3 w-3 bg-neutral-300 disabled:bg-primary-40"
                          }
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.blocked}
                        ></button>
                        {gridColumn === 1 && (
                          <div
                            className="text-white text-xs absolute right-8 font-bold"
                            style={{ top: "0.6rem" }}
                          >
                            {seat.seatRow}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TransformComponent>
            )}
          </TransformWrapper>
        </div>
        <>
          <div className="flex flex-col justify-between py-6 pr-2 flex-grow mt-8 mb-8 sm:w-1/3 sm:ml-4">
            <h2 className="text-sm lg:text-xl xl:text-2xl sm:text-xl font-semibold mb-4 text-center w-full">
              Select your ticket type
            </h2>
            {[
              { label: "Regular 10€", type: "Regular" },
              { label: "Student 8€", type: "Student" },
              { label: "Child 6€", type: "Child" },
            ].map(({ label, type }) => (
              <div key={type} className="mb-4 w-full text-center">
                <label className="block font-bold mb-2 text-sm">{label}</label>
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
                <span className="px-4 text-sm">{ticketTypes[type]}</span>
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
                disabled={selectedSeatsId.length === 0}
                className={`transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg text-sm ${
                  selectedSeatsId.length === 0 ? "bg-accent-20" : "bg-accent-40"
                }`}
              >
                Proceed to Payment
              </button>
            </div>
            <div className="text-center w-full mt-4">
              <button
                onClick={handleCancel}
                className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg text-sm bg-red-400"
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
