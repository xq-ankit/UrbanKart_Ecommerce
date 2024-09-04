import React, { useContext } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import { cartContext } from "./contexts";
import withUser from "./withUser";

function Cartpage() {
  const { products, loading, subtotal, removeFromCart, onAddToCart, cartDetails } = useContext(cartContext);

  const handleChange = (event) => {
    const newVal = +event.target.value;
    const productId = event.target.getAttribute("productId");
    onAddToCart(productId, newVal - cartDetails[productId]);
  };

  if (loading) {
    return <LoadingPage />;
  }

  const placeholder = "https://via.placeholder.com/500";

  return (
    <div className="h-screen items-center flex justify-center">
      <div className="min-w-5xl bg-white shadow-md rounded-md my-10 p-6 mx-auto flex flex-col">
        {products.length > 0 ? (
          <>
            <div className="overflow-x-auto">
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
                            onClick={() => removeFromCart(p.id)}
                            className="text-red-500 mr-2"
                          >
                            <IoIosRemoveCircleOutline />
                          </button>
                          <img
                            src={placeholder}
                            alt={p.title}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <span className="text-red-500 font-semibold">{p.title}</span>
                        </div>
                      </td>
                      <td className="p-4">₹ {p.price.toFixed(2)}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={cartDetails[p.id]}
                          onChange={handleChange}
                          min="1"
                          productId={p.id}
                          className="w-16 border rounded p-1 text-center"
                        />
                      </td>
                      <td className="p-4">
                        ₹ {(p.price * cartDetails[p.id]).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 p-6 mt-8 rounded-md ml-auto w-full md:w-2/3">
              <h2 className="text-lg font-semibold">Cart totals</h2>
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">₹ {subtotal}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹ {subtotal}</span>
              </div>
              <button className="bg-red-500 text-white w-full py-3 mt-6 rounded">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-600 text-lg mb-4">Your cart is empty!</p>
            <Link to="/" className="bg-red-500 text-white py-2 px-4 rounded">
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default withUser(Cartpage);
