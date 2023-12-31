import React from 'react'
import { Pagination } from 'flowbite-react';
import { useState } from 'react';


export default function Pagenation () {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
  
    return (
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={1000}
          onPageChange={onPageChange}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      </div>
    );
}

