import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Pagination } from "flowbite-react";
import Navi from "../Component/navbar";
import Carousell from "../corosoule/slider";
import Foter from "../Footer/footer";
import Skeleton from "react-loading-skeleton";
import SkeletonLoad from "../Component/Skeleton";
// import { google } from 'googleapis';

export default function Pageindex() {
  // const oAuth2Client = new google.auth.OAuth2(
  //  process.env.REACT_APP_CLIENT_ID,
  //   process.env.REACT_APP_CLIENT_SECRET,
  // );
  // oAuth2Client.setCredentials({
  //   refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
  // });

  // const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const [fetchdata, setFetchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 50;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apireq = process.env.REACT_APP_BACKFETCH;
    axios
      .get(apireq)
      .then((res) => {
        setFetchData(res.data);
        console.log(res.data);
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
    setCurrentPage(1); // Reset page when the search query changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Any additional logic you may want to add for form submission
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, fetchdata.length);
  const slicedData = fetchdata.slice(startIndex, endIndex);

  const filteredData = slicedData.filter(
    (contest) =>
      contest.host.toLowerCase().includes(searchQuery) ||
      contest.event.toLowerCase().includes(searchQuery)
  );


  /* 
    Update with your own Client Id and Api key 
  */
 

  return (
    <div>
      <Navi />
      <Carousell />
      <h1 className="text-center font-medium text-3xl px-10 py-10">
        Divide and Conquer!
      </h1>
      {/* <div className="mb-5 mt-2.5 flex items-center justify-center align-middle w-full"> */}
      <form onSubmit={handleSubmit} className="ml-10 mr-8 p-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
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
        <div className="py-5">
          <div className="flex flex-row space-x-10">
            <h1 className="font-semibold text-xl mt-1">Search by tags</h1>
            <button
              type="button"
              onClick={() => setSearchQuery("leetcode")}
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Leetcode
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("geeksforgeeks")}
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              GeeksForGeeks
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("codechef")}
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Codechef
            </button>
            <button
              type="button"
              onClick={() => setSearchQuery("codeforces")}
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Codeforces
            </button>
          </div>
        </div>
      </form>
      {/* </div> */}
      <h2 className="font-medium text-2xl pl-9 px-3 py-3">Upcoming Contest</h2>
      {isLoading && <SkeletonLoad cnt = {itemsPerPage} />}
      {filteredData.length === 0 ? (
        <p className="text-center font-bold p-10 text-gray-500">
          No Upcoming Contest found.
        </p>
      ) : (
        filteredData.map((contest, index) => (
          <Forms key={index} data={contest} />
        ))
      )}
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
      <Foter />
    </div>
  );
}

function Forms({ data }) {
  console.log(data);

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
      const sliced = url.substring(0, endIndex);
      return sliced;
    } else {
      return "Host Name not specified";
    }
  };

  // const handleSetCalendar = async () => {
  //   try {
  //     await calendar.events.insert({
  //       calendarId: 'primary',
  //       resource: {
  //         summary: `Meeting with David`,
  //         location: `3595 California St, San Francisco, CA 94118`,
  //         description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
  //         start: {
  //           dateTime: eventStartTime.toISOString(),
  //           timeZone: 'America/Denver',
  //         },
  //         end: {
  //           dateTime: eventEndTime.toISOString(),
  //           timeZone: 'America/Denver',
  //         },
  //       },
  //     });
  //    alert('Calendar event successfully created.');
  //   } catch (error) {
  //     console.error('Error creating calendar event:', error);
  //   }
  // };

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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Check out this contest!",
        text: `Join the ${data.event} contest organized by ${hostd(
          data.host
        )}.`,
        url: data.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  var gapi = window.gapi

  var CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  var API_KEY = process.env.REACT_APP_SECRET
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleSetCalendar = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
    

      })
    })
  }


  return (
    <Card className="mt-2 mb-2 ml-10 mr-10">
      <a href={data.href} target="_blank" rel="noopener noreferrer">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.event}
        </h5>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Organized By : {hostd(data.host)}
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
        <button
          onClick={handleSetCalendar}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to Calendar
        </button>
      </div>
    </Card>
  );
}
