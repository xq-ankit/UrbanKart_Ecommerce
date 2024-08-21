import React, { useEffect, useState, useMemo,} from "react";
import { getProductData } from "./api";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import withUser from "./withUser";


function Cartpage({ cart, updateCart,user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const memoizedCart = useMemo(() => cart, [cart]);
  const [localCart, setLocalCart] = useState(memoizedCart);
  const productId = Object.keys(memoizedCart);
 
  if(!user){

  }

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
        setLoading(false);
      }
    };

    if (productId.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [productId]);

  function handleremove(productId) {
    const newCart = { ...localCart };
    delete newCart[productId];
    updateCart(newCart); 
    setLocalCart(newCart);
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
    <div className="h-screen items-center flex justify-center">
    <div className="min-w-5xl bg-white shadow-md rounded-md my-10 p-6 mx-auto flex flex-col ">
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
                          productId={p.id}
                          onClick={() => handleremove(p.id)} 
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
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Coupon code"
                className="border p-2 rounded mr-4 w-full md:w-64"
              />
              <button className="bg-red-500 text-white py-2 px-4 rounded mt-2 md:mt-0">
                APPLY COUPON
              </button>
            </div>
            <button
              className="bg-red-100 text-red-500 py-2 px-4 mx-2 rounded mt-2 md:mt-0"
              onClick={updateMyCart}
            >
              UPDATE CART
            </button>
          </div>

          <div className="bg-gray-100 p-6 mt-8 rounded-md ml-auto w-full md:w-2/3">
            <h2 className="text-lg font-semibold">Cart totals</h2>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <button className="bg-red-500 text-white w-full py-3 mt-6 rounded">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center ">
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
