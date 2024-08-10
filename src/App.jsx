import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import ErrorPage from './ErrorPage';
import Login from './LoginPage';
import SignUp from './Signup';
import ForgotPassword from './ForgetPassword';

function App() {
const SavedStringObject=localStorage.getItem("my-cart")||"{}";
const SavedObject=JSON.parse(SavedStringObject)
// const [cartdetails,setCartDetails]=useState((0));
// function handleCart(productId,count){
//  setCartDetails(cartdetails+count);
// }

const [cartdetails,setCartDetails]=useState(SavedObject);
function handleCart(productId,count){
  const oldcount=cartdetails[productId] ||0;
  const newCartdetails={...cartdetails, [productId]:count+oldcount}
  setCartDetails(newCartdetails);
  const StingObject=JSON.stringify(newCartdetails);
  localStorage.setItem("my-cart",StingObject);
}
const totalCount=Object.keys(cartdetails).reduce(function(acc,curr){
return (acc + cartdetails[curr]);
},0);
console.log("totalCount: ",totalCount);
  return (
    <div className=" flex flex-col bg-gray-100 min-h-screen">
   
      <Navbar cartcount={totalCount} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetails onAddtoCart={handleCart}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="*" element={<ErrorPage/>} />
        
      </Routes>
      <Footer />
  </div>
  );
}

export default App;
