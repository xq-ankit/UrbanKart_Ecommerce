import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import withUser from "./withUser";
import withAlert from "./withAlert";
import axios from "axios";

function SignUp({ setAlert }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  function callSignUpApi(values) {
    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`;
    console.log("Sending sign-up details", values);

    axios
      .post("https://myeasykart.codeyogi.io/signup", {
        fullName,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        setAlert({
          type: "success",
          message: `Welcome ${fullName}!`,
        });
        navigate("/"); // Redirect to home page
      })
      .catch(() => {
        setAlert({
          type: "error",
          message: "Email already exists!",
        });
      });
  }

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    isValid,
    dirty,
    handleChange,
    handleSubmit,
    values,
    resetForm,
    errors,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: callSignUpApi,
    validationSchema: schema,
    validateOnMount: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-40">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.username && errors.username && (
              <div className="text-red-500 mt-1">{errors.username}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.firstName && errors.firstName && (
              <div className="text-red-500 mt-1">{errors.firstName}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.lastName && errors.lastName && (
              <div className="text-red-500 mt-1">{errors.lastName}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.password && errors.password && (
              <div className="text-red-500 mt-1">{errors.password}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500 mt-1">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={!(dirty && isValid)}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAlert(withUser(SignUp));
