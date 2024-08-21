import React, { useEffect, useState } from 'react';
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import axios from 'axios';
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import ErrorPage from './ErrorPage';
import Login from './LoginPage';
import SignUp from './Signup';
import Cartpage from './Cartpage';
import ForgotPassword from './ForgetPassword';
import LoadingPage from "./LoadingPage";
import AuthRoute from './AuthRoute';

// Create a Context for the cart
export const cartContext = React.createContext();
export const userContext = React.createContext();

function App() {
  const [Loading, setLoading] = useState(true);
  const SavedStringObject = localStorage.getItem("my-cart") || "{}";
  const SavedObject = JSON.parse(SavedStringObject);
  const [user,setUser]=useState()
  console.log("logged in".user);
  const token =localStorage.getItem("token");

  useEffect(()=>{
    if(token){
   axios.get("https://myeasykart.codeyogi.io/me"),{
    headers:{
      Authorization:token},
   }.then((response)=>{
    setLoading(false);
   })
  } else{
    setLoading(false);
  }
},[]);  

if(Loading){
  return <LoadingPage/>
}


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
        <userContext.Provider value={{user,setUser}}>
        <Routes>
          <UserRoute>
         
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/cart" element={<Cartpage cart={cartdetails} updateCart={updateCart} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          </UserRoute>

          <AuthRoute>
          <Route path="/" element={<Home />} />
          </AuthRoute>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </userContext.Provider>
      </cartContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
