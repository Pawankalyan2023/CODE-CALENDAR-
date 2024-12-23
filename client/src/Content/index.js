import React, { useState, useEffect , useContext } from "react";
import axios from "axios";
import { Card, Pagination } from "flowbite-react";
import Navi from "../Component/navbar";
import Carousell from "../corosoule/slider";
import { AuthContext } from "../Context/AuthContext";
import Foter from "../Footer/footer";
import { useNavigate } from "react-router-dom";
import SkeletonLoad from "../Component/Skeleton";
import { gapi } from "gapi-script"; // Import gapi

export default function Pageindex() {

   const { isLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();


  const [fetchdata, setFetchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apireq = process.env.REACT_APP_BACKFETCH;
    axios
      .get(apireq)
      .then((res) => {
        setFetchData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, fetchdata.length);
  const slicedData = fetchdata.slice(startIndex, endIndex);

  const filteredData = slicedData.filter(
    (contest) =>
      contest.host.toLowerCase().includes(searchQuery) ||
      contest.event.toLowerCase().includes(searchQuery)
  );

  return (
    isLoggedIn ? (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navi />
      <Carousell />
      <h1 className="text-center font-medium text-3xl px-10 py-10 dark:text-white">
        Divide and Conquer!
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="ml-10 mr-8 p-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search CodingPlatform..."
            onChange={handleSearch}
            required
          />
        </div>
      </form>
      <h2 className="font-medium text-2xl pl-9 px-3 py-3  dark:text-white">Upcoming Contest</h2>
      {isLoading && <SkeletonLoad cnt={itemsPerPage} />}
      {filteredData.length === 0 ? (
        <p className="text-center font-bold p-10 text-gray-500  dark:text-white">
          No Upcoming Contest found.
        </p>
      ) : (
        filteredData.map((contest, index) => <Forms key={index} data={contest} />)
      )}
      <div className="flex overflow-x-auto sm:justify-center pb-5 ">
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
      <Foter />
    </div>
    ) : navigate("/")
  );
}

function Forms({ data }) {
  const hostd = (url) => {
    const index = url.indexOf(".com");
    const indexIn = url.indexOf(".in");
    const indexOrg = url.indexOf(".org");

    if (index !== -1 || indexIn !== -1 || indexOrg !== -1) {
      const endIndex = Math.min(
        index !== -1 ? index : Number.MAX_SAFE_INTEGER,
        indexIn !== -1 ? indexIn : Number.MAX_SAFE_INTEGER,
        indexOrg !== -1 ? indexOrg : Number.MAX_SAFE_INTEGER
      );
      return url.substring(0, endIndex);
    } else {
      return "Host Name not specified";
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Check out this contest!",
        text: `Join the ${data.event} contest organized by ${hostd(data.host)}.`,
        url: data.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSetCalendar = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: process.env.REACT_APP_SECRET,
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      });

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: data.event,
            location: hostd(data.host),
            description: "Join us for this amazing contest!",
            start: {
              dateTime: new Date(data.start).toISOString(),
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: new Date(data.end).toISOString(),
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [{ email: "attendee@example.com" }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          gapi.client.calendar.events
            .insert({
              calendarId: "primary",
              resource: event,
            })
            .then((response) => {
              window.open(response.result.htmlLink);
            });
        })
        .catch((error) => {
          console.error("Error during sign-in:", error);
        });
    });
  };

  const hostduration = (duration) => {
    if (duration === undefined) {
      return "Duration not specified";
    }
    const hours = Math.floor((duration % (24 * 60)) / 60);
    const minutes = duration % 60;

    if (hours === 0 && minutes === 0) {
      return "Less than an hour";
    } else if (minutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours, ${minutes} minutes`;
    }
  };

  return (
    <Card className="mt-2 mb-2 ml-10 mr-10">
      <a href={data.href} target="_blank" rel="noopener noreferrer">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.event}
        </h5>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Organized By: {hostd(data.host)}
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          Start: {new Date(data.start).toLocaleDateString()} - End:{" "}
          {new Date(data.end).toLocaleDateString()}
        </span>
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          Duration: {hostduration(data.duration)}
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
        <button
          onClick={handleShare}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Share
        </button>
        {/* <button
          onClick={handleSetCalendar}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to Calendar
        </button> */}
      </div>
    </Card>
  );
}
