import React, { useEffect, useState } from "react";
import { userContext } from "../../contexts.js";
import axios from "axios";
import LoadingPage from "../../LoadingPage.jsx";

function UserProvider({children}){
 
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
 if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token,
        }
      }).then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(()=>{
        localStorage.removeItem("token");
        setLoading(false)
      });
    }
    else {
      setLoading(false);
    }
  }, [token])
  if(loading)
     {
    return(<LoadingPage />)
  }
      return (<userContext.Provider value={{isLoggedIn:!!token,  user,setUser}}>{children}</userContext.Provider>
       );

}
export default UserProvider;
