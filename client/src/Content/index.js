import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagenation from './Pagenation';
import Carousell from '../corosoule/slider';
import Forms from './forms';
// import { useNavigate } from 'react-router-dom';

export default function Pageindex() {
  const [fetchdata, setFetchData] = useState([]);

  useEffect(() => {
    // Request data from the backend
    axios.get('http://localhost:3001/api/data') // Replace with your backend URL
      .then(res => {
        console.log(res.data); // Optional: Log the response from the backend
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Empty dependency array to mimic componentDidMount behavior

  return (
    <div>
      <Carousell />
      <h1 className="text-center font-medium text-3xl px-10 py-10">Divide and Conquer!</h1>
      <h2 className='font-medium text-2xl pl-9 px-3 py-3'>Today's Contest</h2>
      {/* Display the fetched data */}
      {fetchdata.map((contest, index) => (
        <Forms key={index} data={contest} />
      ))}
      <Pagenation />
    </div>
  );
}
