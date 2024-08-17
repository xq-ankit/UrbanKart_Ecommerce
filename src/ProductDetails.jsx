import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { getProductData } from "./api";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { cartContext } from "./App";

function ProductDetails() {
  const [details, setDetails] = useState(null);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  const productId = +id;
  const [quantity, setQuantity] = useState(getPreviousQuantity());
  const onAddtoCart = useContext(cartContext);
  useEffect(function () {
    const d = getProductData(productId);
    d.then(function (response) {
      setDetails(response)
      setLoading(false);
      setQuantity(getPreviousQuantity());
    }).catch(function () {
      setLoading(false);
    })

  }, [productId]);

  function getPreviousQuantity() {
    return +localStorage.getItem(id) || 1;
  }



  const handleQuantityChange = (e) => {
    const val = +e.target.value;
    if (val >= 1) {
      setQuantity(val);
      localStorage.setItem(id, val.toString());
    }
  };
 
  function handleAddtoCart() {
    onAddtoCart(productId, quantity);
  }


  
  if (Loading) {
    return <LoadingPage />
  }
  if (!details) {
    return <ErrorPage />
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-5">
        <Link to="/" className="absolute top-22 left-4 text-3xl md:top-22 md:left-10">
          <HiArrowLeft />
        </Link>

        <div className="flex flex-col md:flex-row bg-white p-5 md:p-10 shadow-lg rounded-lg max-w-5xl mt-20 md:mt-10 mb-10 md:mb-5">
          <img
            className="w-full md:w-1/2 h-auto mb-5 md:mb-0"
            src={details.thumbnail}
            alt={details.title}
          />

          <div className="flex flex-col px-5 md:px-10 w-full md:w-1/2">
            <h1 className="font-semibold text-4xl mb-3">{details.title}</h1>
            <h1 className="font-semibold text-2xl mb-3 text-gray-400">
              {details.category}
            </h1>
            <h3 className="text-2xl font-black text-gray-700 mb-5">
            ₹{details.price}
            </h3>
            <p className="text-gray-500 mb-5 text-xl">
              {details.description}
            </p>

            <div className="flex items-center">
              <input
                type="number"
                value={quantity}
                min="1"
                className="w-16 p-2 mr-2 border rounded"
                onChange={handleQuantityChange}
              />
              <button onClick={handleAddtoCart} className="bg-red-500 text-white px-10 py-2 rounded hover:bg-red-600">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-5 mt-5">
        <div>
          {productId > 1 && (
            <Link to={`/product/${productId - 1}`}>
              <HiChevronDoubleLeft />
              Previous
            </Link>
          )}
        </div>
        <div>
          {productId < 194 && (
            <Link to={`/product/${productId + 1}`}>
              <HiChevronDoubleRight className="font-3xl" />
              Next
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
