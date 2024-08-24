import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import withUser from './withUser';
import withAlert from './withAlert';

function Login({ user, setUser,setAlert }) {
  const location = useLocation(); // here i am getting  the current location
  const from = location.state?.from?.pathname || "/"; // and if any previous path exist direct there or default to "/"

  function callLoginApi(values) {
    console.log(values.email, values.password);
    axios
      .post("https://myeasykart.codeyogi.io/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        setAlert({type:"success",message:"Successfully Login"});
      })
      .catch(() => {
        setAlert({type:"error",message:"Invalid email or password"});
      });
  }

  // If the user is logged in, redirect to the original route or homepage
  if (user) {
    return <Navigate to={from} />;
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short! Should be at least 8 characters")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-md min-h-[450px]">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome Back to UrbanCart
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={callLoginApi}
          validationSchema={schema}
          validateOnMount
        >
          {({ handleChange, handleBlur, values, touched, errors, isValid, dirty, resetForm }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 sr-only">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 mt-1">{errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2 sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 mt-1">{errors.password}</div>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link to="/forgot-password" className="text-sm md:text-base text-indigo-600 hover:underline">
                  Forgot Password?
                </Link>
                <Link to="/sign-up" className="text-sm md:text-base text-indigo-600 hover:underline">
                  Create an Account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default withAlert(withUser(Login));
