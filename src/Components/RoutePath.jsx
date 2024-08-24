import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetails from "../ProductDetails";
import ErrorPage from "../ErrorPage";
import Login from "../LoginPage";
import SignUp from "../Signup";
import Cartpage from "../Cartpage";
import ForgotPassword from "../ForgetPassword";
import AuthRoute from "../AuthRoute";
import UserRoute from "../UserRoute";
import Home from "../Home";

function RoutePath() {
  return (
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
            <Cartpage />
          </UserRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default RoutePath;
