import React, { useEffect, useState } from "react";
import { userContext } from "../../contexts.js";
import axios from "axios";
import LoadingPage from "../../LoadingPage.jsx";

function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Declare state for isLoggedIn
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true); // Set isLoggedIn to true if request is successful
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false); // Set isLoggedIn to false if request fails
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <userContext.Provider value={{ isLoggedIn, user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
