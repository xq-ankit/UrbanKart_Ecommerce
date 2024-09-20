import React, { useState, useEffect } from "react"; 
import { cartContext } from "../../contexts";
import { getCart, saveCart, getProductByIds } from "../../api";

function CartProvider({ isLoggedIn, children }) {
  const [cartDetails, setCartDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      setLoading(true);
      let cartData = {};

      if (isLoggedIn) {
        // Fetch cart from the server if the user is logged in
        try {
          cartData = await getCart();
        } catch (error) {
          console.error("Error fetching cart from server:", error);
        }
      } else {
        // Otherwise, fetch cart from localStorage
        cartData = JSON.parse(localStorage.getItem("my-cart") || "{}");
      }

      setCartDetails(cartData);

      // Fetch products by IDs if there are any items in the cart
      const productIds = Object.keys(cartData);
      if (productIds.length > 0) {
        try {
          const productsData = await getProductByIds(productIds);
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setProducts([]);
      }

      setLoading(false);
    };

    fetchCartAndProducts();
  }, [isLoggedIn]);

  const cartCount = Object.values(cartDetails).reduce((acc, curr) => acc + curr, 0);
  const subtotal = products.reduce((acc, p) => acc + p.price * cartDetails[p.id], 0).toFixed(2);

  const updateCart = async (newCartDetails) => {
    setCartDetails(newCartDetails);

    if (isLoggedIn) {
      try {
        await saveCart(newCartDetails); // Save cart to the server
      } catch (error) {
        console.error("Error saving cart to server:", error);
      }
    } else {
      localStorage.setItem("my-cart", JSON.stringify(newCartDetails)); // Save cart to localStorage
    }

    const productIds = Object.keys(newCartDetails);
    if (productIds.length > 0) {
      try {
        const productsData = await getProductByIds(productIds);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching updated products:", error);
      }
    } else {
      setProducts([]);
    }
  };

  const onAddToCart = (productId, count) => {
    const oldCount = cartDetails[productId] || 0;
    const newCartDetails = { ...cartDetails, [productId]: count + oldCount };
    updateCart(newCartDetails);
  };

  const removeFromCart = (productId) => {
    const newCartDetails = { ...cartDetails };
    delete newCartDetails[productId];
    updateCart(newCartDetails);
  };

  return (
    <cartContext.Provider
      value={{
        cartDetails,
        products,
        loading,
        cartCount,
        subtotal,
        onAddToCart,
        removeFromCart,
        updateCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
