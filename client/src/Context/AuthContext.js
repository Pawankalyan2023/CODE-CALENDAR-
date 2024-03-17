// AuthContext.js
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {

  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [domain, setdomain] = useState([]); // Add tickets state

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storeddomain = JSON.parse(localStorage.getItem("domain"));

    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }

    if (storeddomain) {
      setdomain(storeddomain);
    }
  }, []);

  const login = ({ userdata }) => {
    setIsLoggedIn(true);
    setUser(userdata);
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser([]);
    localStorage.removeItem("user");
    localStorage.removeItem("domain");
  };

  const adddomain = (domains) => {
    setdomain([...domain, domains]);
    localStorage.setItem("domain", JSON.stringify([...domain, domains]));
  };

  // const removedomain = (domainname) => {
  //   const updatedTickets = domain.filter((domainname) => ticket.id !== ticketId);
  //   setTickets(updatedTickets);
  //   localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  // };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isLoggedIn,
        adddomain,
        domain
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
