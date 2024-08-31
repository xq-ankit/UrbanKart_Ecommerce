import React,{useContext} from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import withUser from './withUser';
import { cartContext } from './contexts';

function Navbar({ user, setUser }) {
  const{cartcount}=useContext(cartContext);
  const handelLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
}
  return (
    <div className="flex justify-between items-center px-4 sm:px-40 py-4 bg-white shadow-md z-50 min-w-full">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="./img/mini_logo.png"
          className="h-10"
        />
        <img
          src="./img/main_logo.png"
          className="h-10 md:h-16"
          alt="Logo"
        />
      </picture>
      <button className='border rounded-full' onClick={handelLogout}><CiLogout /></button>
      <div className="relative">
     <Link to='/cart' ><LiaShoppingBagSolid className="text-3xl text-gray-800" /></Link>  
        {cartcount > 0 && (
          <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
            {cartcount}
          </span>
        )}
      </div>
    </div>
  );
}

export default withUser(Navbar);
