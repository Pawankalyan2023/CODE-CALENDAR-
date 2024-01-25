import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Pagination } from 'flowbite-react';
import Navi from '../Component/navbar';
import Carousell from '../corosoule/slider';
import Foter from '../Footer/footer';

export default function Pageindex() {
  const [fetchdata, setFetchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 50;

  useEffect(() => {
    const apireq = process.env.REACT_APP_BACKFETCH;
    axios.get(apireq)
      .then(res => {
        setFetchData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset page when the search query changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Any additional logic you may want to add for form submission
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = fetchdata.slice(startIndex, endIndex);

  const filteredData = slicedData.filter(contest =>
    contest.host.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <Navi />
      <Carousell />
      <h1 className="text-center font-medium text-3xl px-10 py-10">Divide and Conquer!</h1>
      {/* <div className="mb-5 mt-2.5 flex items-center justify-center align-middle w-full"> */}
        <form onSubmit={handleSubmit} className='ml-10 mr-8 p-5'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            {/* ... (existing code) */}
            <input
              type="search"
              value={searchQuery}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search CodingPlatform..."
              onChange={handleSearch}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      {/* </div> */}
      <h2 className='font-medium text-2xl pl-9 px-3 py-3'>Today's Contest</h2>
      {filteredData.map((contest, index) => (
        <Forms key={index} data={contest} />
      ))}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
          previousLabel="Previous"
          nextLabel="Next"
          showIcons
        />
      </div>
      <Foter />
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