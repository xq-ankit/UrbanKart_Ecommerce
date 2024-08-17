import { Formik,Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Login() {
  function callLoginApi(values) {
    console.log("Sending login Details", values);
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short! Should be at least 8 characters")
      .required("Required"),
  });

  const initialValues= {
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
      validateOnMount:true
      >
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 sr-only"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 sr-only"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
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
              onClick={resetForm}
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
        </Formik>
      </div>
    </div>
  );
}

export default Login;
