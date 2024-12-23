import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => { // Initialize with null instead of an empty array
  const [displayLeetcode, setDisplayLeetcode] = useState("");
  const [displaycodeforces , setDisplaycodeforces] = useState("");
  const [displaycodechef , setCodechef] = useState("");


  useEffect(() => {

    const fetchData = async () => {

          const updatedetails = process.env.REACT_APP_UPDATEDETAILS || "http://localhost:3001/updateDetails";

          const response = await axios.get(updatedetails);

          console.log(response.data);

          if (response.status === 200) {
            // navigate("/home");
            console.log(response.data);
            setDisplayLeetcode(response.data.leetcodeProfile);
            setDisplaycodeforces(response.data.codeforcesProfile);
            setCodechef(response.data.codechefProfile);
          } else {
            alert("Error in sending details");
          }

      }

    fetchData();

    
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-xl">Dashboard</h1>
      <h1 className="text-center font-bold text-xl">Leetcode</h1>
      {/* {leetcode && leetcode.userContestRanking && (
        <div>
          <p>Rating: {leetcode.userContestRanking.rating}</p>
          <p>Global Ranking: {leetcode.userContestRanking.globalRanking}</p>
          <p>
            Attended Contests Count:{" "}
            {leetcode.userContestRanking.attendedContestsCount}
          </p>
          <p>Top Percentage: {leetcode.userContestRanking.topPercentage}</p>
        </div>
      )} */}
      <div dangerouslySetInnerHTML={{ __html: displayLeetcode }} />
    </div>
  );
};

export default Dashboard;
