import React, { useState, useContext } from "react";
import Navi from "../Component/navbar";
import Foter from "../Footer/footer";
import { Button, Input } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export default function Getdetails() {

  const { isLoggedIn} = useContext(AuthContext);

  const userdetails = localStorage.getItem("user");

  // const email = userdetails.email;

  const navigate = useNavigate();

  const [leetcode, setleecode] = useState("");
  const [codeforces, setcodeforces] = useState("");
  const [codechef, setcodechef] = useState("");
  const [gfg, setGfg] = useState("");
  const [leetcodepref, setleecodepref] = useState("");
  const [codeforcespref, setcodeforcespref] = useState("");
  const [codechiefpref, setcodechiefpref] = useState("");
  const [gfgpref, setGfgpref] = useState("");

  const handledetails = async () => {

    console.log(userdetails);

    let email = ""; // Initialize email variable

    if (userdetails) {
      const userDetailsObject = JSON.parse(userdetails);
      email = userDetailsObject.email;
    }

    console.log(email);

    console.log(
      leetcode,
      codeforces,
      codechef,
      leetcodepref,
      gfgpref,
      codeforcespref,
      codechiefpref
    );

    const updatedetails = process.env.REACT_APP_BACKAPI;

    const response = await axios.post(`${updatedetails}/getDetails/${email}`, {
      leetcode,
      codeforces,
      codechef,
      leetcodepref,
      codeforcespref,
      codechiefpref,
      gfg,
      gfgpref,
    });

    console.log(`Eror in client : ${response.data}`);

    if (response.status === 200) {
      console.log(response.data);
      navigate("/home");
    } else {
      alert("Error in sending details");
    }
  };

  return (
    isLoggedIn ? (    
    <div>
      <h1 className="text-center text-2xl p-5 font-bold">
        Send Us Your Details
      </h1>
      <h2 className="text-center font-semibold">
        to provide you with personalized experience
      </h2>
      <div className="px-10">
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Leetcode Account
          </label>
          <input
            type="text"
            id="base-input"
            value={leetcode}
            onChange={(e) => setleecode(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your GeeksForGeeks Account
          </label>
          <input
            type="text"
            id="geeksforgeek-input"
            onChange={(e) => setGfg(e.target.value)}
            value={gfg}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Codechef Account
          </label>
          <input
            type="text"
            id="base-input"
            value={codechef}
            onChange={(e) => setcodechef(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Codeforces Account
          </label>
          <input
            type="text"
            id="base-input"
            value={codeforces}
            onChange={(e) => setcodeforces(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Choose Coding Platform:
          </h3>
          <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onClick={(e) => setleecodepref("Leetcode")}
                />
                <label
                  for="vue-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Leetcode
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onClick={(e) => setGfgpref("GeeksForGeeks")}
                />
                <label
                  for="react-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  GeeksForGeeks
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="angular-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onClick={(e) => setcodechiefpref("CodeChef")}
                />
                <label
                  for="angular-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  CodeChef
                </label>
              </div>
            </li>
            <li class="w-full dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="laravel-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onClick={(e) => setcodeforcespref("CodeForces")}
                />
                <label
                  for="laravel-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  CodeForces
                </label>
              </div>
            </li>
          </ul>
          <Button className="my-5" onClick={handledetails}>
            Submit Details
          </Button>
        </div>
      </div>
    </div>
    ) : navigate("/")
  );
}
