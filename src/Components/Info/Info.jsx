import React, { useState } from "react";
import axios from "axios";

function Info() {


    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [Loading , setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const query = `SELECT * FROM Orders INNER JOIN Event_Details ON Orders.event_id = Event_Details.event_id WHERE Orders.customer_id = (SELECT customer_id FROM Users WHERE email = '${email}' AND password = '${password}')`;

    const params = [email, password];

    const queryJSON1 = {
      query: query,
    };

    const response = await axios.post(
      "https://dbms-go5s.onrender.com/query",
      queryJSON1
    );

    setData(response.data);
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-evenly space-x-4 bg-white p-4 rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      {/* Render the data */}
      <div className="w-full flex justify-center items-center overflow-x-auto p-4 font-body flex-wrap gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <p className="text-xl font-semibold mb-2">Name: {item.event_name}</p>
                <p className="text-gray-700 mb-1">Amount: {item.amount}</p>
                <p className="text-gray-700 mb-1">Date: {item.order_date}</p>
                <p className="text-gray-700">Id: {item.order_id}</p>
          </div>
        ))}
      </div>

        {Loading && <p className="text-center text-xl font-semibold mt-4">Loading...</p>}
    </div>
  );
}

export default Info;
