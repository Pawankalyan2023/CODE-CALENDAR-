import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Singin() {
  
  const { login , isLoggedIn} = useContext(AuthContext);

  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginauth = process.env.REACT_APP_LOGIN;

    const usercurdata = { email, password };

    // console.log(usercurdata);

    try {
      const response = await axios.post(loginauth, {
        email: email,
        password: password,
      });
      // console.log(response);

      if (response && response.data) {
        // console.log("Login successful:", response.data);
        login({ userdata: usercurdata });
        navigation("/home");
      } else {
        console.error("Login failed: No data in response");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Check your credentials and try again.");
    }
  };

  return (
    !isLoggedIn ? (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h2 className="text-4xl pb-10">Welcome to Code Calendar ❤️</h2>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  href="#"
                  class="text-sm font-medium dark:text-white text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </button>
              </div>
              <button
                class="w-full text-white dark:bg-green-400 bg-gray-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-white">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-black dark:text-white ml-5 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ar u an Admin?
                <Link
                  to="/adminauth"
                  className="font-medium text-primary-600 text-black hover:underline dark:text-primary-500 ml-7"
                >
                  Access Here!
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
    ) : navigation("/home")
  );
}
