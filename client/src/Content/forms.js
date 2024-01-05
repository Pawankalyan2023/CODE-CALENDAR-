import React from 'react';
import { Card } from 'flowbite-react';

export default function Forms({ data }) {
  // Logging the received data to ensure it's correctly received
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
