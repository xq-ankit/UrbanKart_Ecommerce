import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import ErrorPage from './ErrorPage';
import Login from './LoginPage';
import SignUp from './Signup';
import Cartpage from './Cartpage';
import ForgotPassword from './ForgetPassword';

// Create a Context for the cart
export const cartContext = React.createContext();

function App() {
  const SavedStringObject = localStorage.getItem("my-cart") || "{}";
  const SavedObject = JSON.parse(SavedStringObject);

  // State to manage cart details
  const [cartdetails, setCartDetails] = useState(SavedObject);

  // Function to add items to cart
  const onAddtoCart = (productId, count) => {
    const oldcount = cartdetails[productId] || 0;
    const newCartdetails = { ...cartdetails, [productId]: count + oldcount };
    updateCart(newCartdetails);
  };

  // Function to update cart and save to localStorage
  function updateCart(newCartdetails) {
    setCartDetails(newCartdetails);
    const StingObject = JSON.stringify(newCartdetails);
    localStorage.setItem("my-cart", StingObject);
  }

  // Calculate total item count in cart
  const totalCount = Object.keys(cartdetails).reduce((acc, curr) => {
    return acc + cartdetails[curr];
  }, 0);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <Navbar cartcount={totalCount} />
      <cartContext.Provider value={onAddtoCart}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cartpage cart={cartdetails} updateCart={updateCart} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </cartContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
