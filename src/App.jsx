import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./Alert";
import UserProvider from "./Components/Providers/UserProvider";
import AlertProvider from "./Components/Providers/AlertProvider";
import CartProvider from "./Components/Providers/CartProvider";
import RoutePath from "./Components/RoutePath";

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <UserProvider>
        <AlertProvider>
          <CartProvider>
            <Navbar />
            <Alert />
            <RoutePath/>
          </CartProvider>
        </AlertProvider>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
