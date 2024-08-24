import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "../../LoadingPage";
import { AlertContext, userContext } from "../../contexts";

function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUser(response.data); 
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const removeAlert = () => setAlert(null);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
