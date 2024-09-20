import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { getProductData } from "./api";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { cartContext } from "./contexts";

// TypeScript types
interface ProductDetails {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  thumbnail: string;
}

function ProductDetails() {
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id?: string }>();
  const productId = id ? +id : NaN;
  const [quantity, setQuantity] = useState(getPreviousQuantity());
  const { onAddToCart } = useContext(cartContext);

  useEffect(() => {
    if (isNaN(productId)) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getProductData(productId);
        setDetails(response);
        setLoading(false);
        setQuantity(getPreviousQuantity());
      } catch {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  function getPreviousQuantity(): number {
    const storedQuantity = localStorage.getItem(id || '');
    return storedQuantity ? +storedQuantity : 1;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (val >= 1) {
      setQuantity(val);
      if (id) {
        localStorage.setItem(id, val.toString());
      }
    }
  };

  const handleAddToCart = () => {
    if (details) {
      onAddToCart(productId, quantity);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }
  if (!details) {
    return <ErrorPage />;
  }
 const placeholder="https://placehold.co/200X150";
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <Link to="/" className="text-xl text-gray-600 mb-6 flex items-center">
          <HiArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="flex flex-col md:flex-row bg-white p-5 md:p-10 shadow-lg rounded-lg  max-w-5xl min-w-5xl mt-20 md:mt-10 mb-10 md:mb-5">
          <img
            className="w-full md:w-1/2 h-64 object-cover"
            src={placeholder}
            alt={details.title}
          />

          <div className="p-6 md:p-10 w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{details.title}</h1>
            <h2 className="text-xl font-semibold text-gray-600 mb-4">{details.category}</h2>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">₹ {details.price}</h3>
            <p className="text-gray-700 mb-6">{details.description}</p>

            <div className="flex items-center mb-6">
              <input
                type="number"
                value={quantity}
                min="1"
                className="w-16 p-2 mr-2 border rounded"
                onChange={handleQuantityChange}
              />
              <button
                onClick={handleAddToCart}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div>
            {productId > 1 && (
              <Link
                to={`/product/${productId - 1}`}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <HiChevronDoubleLeft className="text-2xl mr-2" /> Previous
              </Link>
            )}
          </div>
          <div>
            {productId < 194 && (
              <Link
                to={`/product/${productId + 1}`}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                Next <HiChevronDoubleRight className="text-2xl ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
