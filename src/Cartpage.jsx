import React, { useEffect, useState, useMemo } from "react";
import { getProductData } from "./api";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import LoadingPage from "./LoadingPage";

function Cartpage({ cart, updateCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const memoizedCart = useMemo(() => cart, [cart]);
  const [localCart, setLocalCart] = useState(memoizedCart);
  const productId = Object.keys(memoizedCart);

  useEffect(() => {
    setLocalCart(memoizedCart);
  }, [memoizedCart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const myallproductpromise = productId.map((id) => getProductData(id));
        const productsData = await Promise.all(myallproductpromise);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // Seting the loading to false after products are loaded or if there was an error
      }
    };

    if (productId.length > 0) {
      fetchProducts();
    } else {
      setLoading(false); // Handle empty cart case
    }
  }, [productId]);

  function handleremove(event) {
    const productId = event.currentTarget.getAttribute("productId");
    const newCart = { ...localCart };
    delete newCart[productId];
    updateCart(newCart);
    setLocalCart(newCart); // Update local cart without setting loading state
  }

  function updateMyCart() {
    updateCart(localCart);
  }

  function handleChange(event) {
    const newval = +event.target.value;
    const productId = event.target.getAttribute("productId");
    const newLocalCart = { ...localCart, [productId]: newval };
    setLocalCart(newLocalCart);
  }

  if (loading) {
    return <LoadingPage />;
  }

  const subtotal = products.reduce((acc, p) => acc + p.price * localCart[p.id], 0).toFixed(2);

  return (
    <div className="min-w-5xl bg-white shadow-md rounded-md my-10 p-6 mx-auto flex flex-col">
      {products.length > 0 ? (
        <>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600">
                <th className="p-4 border-b">Product</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Quantity</th>
                <th className="p-4 border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center">
                      <button
                        onClick={handleremove}
                        productId={p.id}
                        className="text-red-500 mr-2"
                      >
                        <IoIosRemoveCircleOutline />
                      </button>
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <span className="text-red-500 font-semibold">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4">₹{p.price.toFixed(2)}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={localCart[p.id]}
                      onChange={handleChange}
                      min="1"
                      productId={p.id}
                      className="w-16 border rounded p-1 text-center"
                    />
                  </td>
                  <td className="p-4">
                  ₹{(p.price * localCart[p.id]).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Coupon code"
                className="border p-2 rounded mr-4 w-64"
              />
              <button className="bg-red-500 text-white py-2 px-4 rounded m-2">
                APPLY COUPON
              </button>
            </div>
            <button
              className="bg-red-100 text-red-500 py-2 px-4 rounded m-2"
              onClick={updateMyCart}
            >
              UPDATE CART
            </button>
          </div>

          <div className="bg-gray-100 p-6 mt-8 rounded-md ml-auto w-2/3">
            <h2 className="text-lg font-semibold">Cart totals</h2>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <button className="bg-red-500 text-white w-full py-3 mt-6 rounded">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty</p>
      )}
    </div>
  );
}

export default Cartpage;
