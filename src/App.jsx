import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductDetails from "./ProductDetails";
import ErrorPage from "./ErrorPage";
import Login from "./LoginPage";
import SignUp from "./Signup";
import Cartpage from "./Cartpage";
import ForgotPassword from "./ForgetPassword";
import { cartContext, userContext, AlertContext } from "./contexts";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";
import Alert from "./Alert";

function App() {
  const savedStringObject = localStorage.getItem("my-cart") || "{}";
  const savedObject = JSON.parse(savedStringObject);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [cartDetails, setCartDetails] = useState(savedObject);

  const onAddToCart = (productId, count) => {
    const oldCount = cartDetails[productId] || 0;
    const newCartDetails = { ...cartDetails, [productId]: count + oldCount };
    updateCart(newCartDetails);
  };

  useEffect(() => {
    localStorage.removeItem("my-cart");
    localStorage.clear();
  }, []);

  function updateCart(newCartDetails) {
    setCartDetails(newCartDetails);
    const stringObject = JSON.stringify(newCartDetails);
    localStorage.setItem("my-cart", stringObject);
  }

  const removeAlert = () => {
    setAlert(null);
  };

  const totalCount = Object.keys(cartDetails).reduce(
    (acc, curr) => acc + cartDetails[curr],
    0
  );

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <userContext.Provider value={{ user, setUser }}>
        <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
          <Navbar cartcount={totalCount} />
          <Alert />
          <cartContext.Provider value={{ cartDetails, onAddToCart, updateCart }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthRoute>
                    <SignUp />
                  </AuthRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/cart"
                element={
                  <UserRoute>
                    <Cartpage cart={cartDetails} updateCart={updateCart} />
                  </UserRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </cartContext.Provider>
        </AlertContext.Provider>
      </userContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
