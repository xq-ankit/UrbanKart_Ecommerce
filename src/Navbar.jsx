import React from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";

function Navbar({ cartcount }) {
  return (
    <div className=" flex justify-between items-center px-4 sm:px-40 py-4 bg-white shadow-md z-50">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="https://www.fineprintart.com/images/blog/amazon-logo/amazon_logo_history_5.jpg"
          className="h-10"
        />
        <img
          src="https://www.pngall.com/wp-content/uploads/13/Amazon-Logo-PNG.png"
          className="h-10 md:h-16"
          alt="Amazon Logo"
        />
      </picture>
      <div className="relative">
        <LiaShoppingBagSolid className="text-3xl text-gray-800" />
        {cartcount > 0 && (
          <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
            {cartcount}
          </span>
        )}
      </div>
    </div>
  );
}

export default Navbar;
