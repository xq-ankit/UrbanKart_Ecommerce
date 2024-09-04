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
        cartData = await getCart();
      } else {
        cartData = JSON.parse(localStorage.getItem("my-cart") || "{}");
      }

      setCartDetails(cartData);

      const productIds = Object.keys(cartData);
      if (productIds.length > 0) {
        const productsData = await getProductByIds(productIds);
        setProducts(productsData);
      } else {
        setProducts([]);
      }

      setLoading(false);
    };

    fetchCartAndProducts();
  }, [isLoggedIn]);

  const cartCount = Object.values(cartDetails).reduce((acc, curr) => acc + curr, 0);
  const subtotal = products.reduce((acc, p) => acc + p.price * cartDetails[p.id], 0).toFixed(2);

  const updateCart = (newCartDetails) => {
    setCartDetails(newCartDetails);

    if (isLoggedIn) {
      saveCart(newCartDetails);
    } else {
      localStorage.setItem("my-cart", JSON.stringify(newCartDetails));
    }

    const productIds = Object.keys(newCartDetails);
    if (productIds.length > 0) {
      getProductByIds(productIds).then(setProducts);
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
      value={{ cartDetails, products, loading, cartCount, subtotal, onAddToCart, removeFromCart, updateCart }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
