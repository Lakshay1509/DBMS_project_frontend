import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Paypal() {
  const paypal = useRef();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [eventName, setEventName] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [event_id, setEvent_id] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!paymentSuccess || successId === null || !date || !event_id) return;

    async function insertOrder() {
      const queryJSON1 = {
        query: `INSERT INTO Orders (order_id, customer_id, event_id, amount, order_date) 
        VALUES (${successId}, ${id}, ${event_id}, ${parseFloat(amount)}, '${date}')`,
      };

      try {
        const response = await axios.post(
          "https://dbms-go5s.onrender.com/query",
          queryJSON1
        );
        console.log(response);
        console.log("Order inserted successfully");
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    }
    insertOrder();
  }, [paymentSuccess, successId, date, event_id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const amount = searchParams.get("amount");
    const eventName = searchParams.get("event");
    const id = searchParams.get("id");
    const event_id = searchParams.get("event_id");

    const parsedAmount = parseFloat(amount);
    setAmount(parsedAmount);
    setEventName(eventName);
    const parsedId = parseInt(id);
    setId(parsedId);
    const parsedEventId = parseInt(event_id);
    setEvent_id(parsedEventId);
  }, [location]);

  useEffect(() => {
    if (!amount) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          setPaymentSuccess(true);
          const newSuccessId = Math.floor(Math.random() * 900) + 100; // Generates a 3-digit order ID
          setSuccessId(newSuccessId);
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];
          setDate(formattedDate);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [amount]);

  return (
    <div className="w-full h-screen text-center flex flex-col justify-center items-center">
      {!paymentSuccess ? (
        <>
          <div className="mb-8 text-xl font-body">
            Your amount will be: {amount} for the event: {eventName}
          </div>
          {amount !== null && <div ref={paypal}></div>}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-lg mb-4">Your Order ID is: {successId}</p>
          <div className="w-full flex justify-center items-center mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#4CAF50" />
              <polyline
                points="14,24 22,32 34,16"
                stroke="#fff"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-lg mb-4">Scan the QR code below:</p>
          <div className="w-full flex justify-center items-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
              alt="QR Code"
              width="150"
              height="150"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Paypal;