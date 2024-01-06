import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Pagination } from 'flowbite-react';
import Carousell from '../corosoule/slider';

export default function Pageindex() {
  const [fetchdata, setFetchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3001/api/data') 
      .then(res => {
        setFetchData(res.data); 
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = fetchdata.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  return (
    <div>
      <Carousell />
      <h1 className="text-center font-medium text-3xl px-10 py-10">Divide and Conquer!</h1>
      <h2 className='font-medium text-2xl pl-9 px-3 py-3'>Today's Contest</h2>
      {slicedData.map((contest, index) => (
        <Forms key={index} data={contest} />
      ))}

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(fetchdata.length / itemsPerPage)}
          onPageChange={handlePageChange}
          previousLabel="Previous"
          nextLabel="Next"
          showIcons
        />
      </div>
    </div>
  );
}

function Forms({ data }) {
  console.log(data);

  return (
    <Card className="mt-2 mb-2 ml-10 mr-10">
      <a href={data.href} target="_blank" rel="noopener noreferrer">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.event}
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          Start: {new Date(data.start).toLocaleDateString()} - End: {new Date(data.end).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-middle">
        <a
          href={data.href}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Competition
        </a>
      </div>
    </Card>
  );
}
