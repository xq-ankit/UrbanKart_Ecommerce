import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-6xl tracking-tight font-extrabold text-gray-800 dark:text-gray-200">
            404
          </h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-800 dark:text-gray-500">
            Page Not Found
          </p>
          <p className="mb-4 text-base font-light text-gray-700 dark:text-gray-400">
            Sorry, we can't find that page. You can go back to the homepage.
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-800 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
