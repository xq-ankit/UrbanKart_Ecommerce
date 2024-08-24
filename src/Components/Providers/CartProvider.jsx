import React, { useState, useEffect } from "react";
import { cartContext } from "../../contexts";

function CartProvider({ children }) {
  const savedStringObject = localStorage.getItem("my-cart") || "{}";
  const savedObject = JSON.parse(savedStringObject);
  const [cartDetails, setCartDetails] = useState(savedObject);

  
  const cartcount = Object.keys(cartDetails).reduce(
    (acc, curr) => acc + cartDetails[curr],
    0
  );

  function updateCart(newCartDetails) {
    setCartDetails(newCartDetails);
    localStorage.setItem("my-cart", JSON.stringify(newCartDetails));
  }

  const onAddToCart = (productId, count) => {
    const oldCount = cartDetails[productId] || 0;
    const newCartDetails = { ...cartDetails, [productId]: count + oldCount };
    updateCart(newCartDetails);
  };

 
  useEffect(() => {
    localStorage.setItem("my-cart", JSON.stringify(cartDetails));
  }, [cartDetails]);

  return (
    <cartContext.Provider value={{ cartDetails, onAddToCart, updateCart,cartcount}}>
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
