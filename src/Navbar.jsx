import React, { useContext } from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { PiSignInFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import withUser from './withUser';
import { cartContext } from './contexts';

function Navbar({ user, setUser }) {
  const { cartCount } = useContext(cartContext);
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  const handleSignIn = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-40 py-4 bg-white shadow-md z-50 min-w-full">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="../public/img/mini_logo.png"
          className="h-10"
        />
        <img
          src="../public/img/main_logo.png"
          className="h-10 md:h-16"
          alt="Logo"
        />
      </picture>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Link to='/cart'>
            <LiaShoppingBagSolid className="text-3xl text-gray-800" />
          </Link>
          {/* {user &&()}  */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {user && (
          <span className="text-sm font-medium text-gray-800">
            Welcome {user.full_name}!
          </span>)}
        {!user && (
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={handleSignIn}
          >
            <PiSignInFill className="mr-2 text-xl" />
            <span>Sign In</span>
          </button>
        )}
        {user && (
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={handleLogout}
          >
            <CiLogout className="mr-2 text-xl" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default withUser(Navbar);
