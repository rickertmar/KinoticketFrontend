import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function TicketSelection({ isAuthenticated }) {
  const router = useRouter();
  const { selectedSeats, showid, slug } = router.query;
  const parsedSeats = JSON.parse(selectedSeats || "[]");

const [ticketTypes, setTicketTypes] = useState({ Regular: parsedSeats.length, Student: 0, Child: 0 });
  const [seatIdToInfo, setSeatIdToInfo] = useState({});

  const handleCancel = () => {
    router.back();
  };

  const handlePayment = () => {
    if (!isAuthenticated) {
      
      alert("You must be logged in to proceed to payment.");
      return;}
    const totalSeats = parsedSeats.length;
    const totalPrice = ticketTypes.Regular * 10 + ticketTypes.Student * 8 + ticketTypes.Child * 6;

    router.push({
      pathname: `/movies/${router.query.slug}/show/${router.query.showid}/confirmation`,
      query: {
        totalSeats: totalSeats,
        ticketTypes: JSON.stringify(ticketTypes),
        totalPrice: totalPrice,
        showid: showid,
        slug: slug,
        selectedSeats: JSON.stringify(parsedSeats),
      },
    });
  };


  const adjustTicketTypeCount = (type, delta) => {
    const newCount = Math.max(0, ticketTypes[type] + delta);
    let totalTickets = Object.values(ticketTypes).reduce((a, b) => a + b, 0) - ticketTypes[type] + newCount;

    if (totalTickets <= parsedSeats.length) {
      setTicketTypes({
        ...ticketTypes,
        [type]: newCount,
      });
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
        setTicketTypes({
          ...ticketTypes,
          [type]: newCount,
          Regular: ticketTypes.Regular - 1,
        });
      }
    }
  };


  return (
    <>
      <Head>
        <title>Select your ticket type</title>
      </Head>
      <main className="bg-primary-20 mt-5 text-white">
        <div className="flex flex-row flex-nowrap max-w-7xl mx-auto p-6">
          <div className="flex flex-col w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center w-full">
              Select your ticket type
            </h2>

            {[
              { label: "Regular 10€", type: "Regular" },
              { label: "Student 8€", type: "Student" },
              { label: "Child 6€", type: "Child" },
            ].map(({ label, type }) => (
              <div key={type} className="mb-4 w-full">
                <label className="block font-bold mb-2">
      {label}
    </label>
                <button onClick={() => adjustTicketTypeCount(type, -1)} className="bg-accent-40 text-white px-2 py-1 rounded-l">-</button>
                <span className="px-4">{ticketTypes[type]}</span>
                <button onClick={() => adjustTicketTypeCount(type, 1)} className="bg-accent-40 text-white px-2 py-1 rounded-r">+</button>
              </div>
            ))}

            <div className="text-center w-full">
                <button
                  onClick={handlePayment}
                  className="transition duration-300 ease-in-out font-bold py-3 px-6 rounded-lg bg-accent-40"
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
        </div>
      </main>
    </>
  );
}
