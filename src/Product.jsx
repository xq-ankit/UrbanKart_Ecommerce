import React from 'react';
import { Link } from 'react-router-dom';

function Product({ thumbnail, category, title, price, id}) {
  return (
    <div className="product p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-zinc-400">
      <div className="w-full h-52"> 
        <img className="w-full h-full object-cover" src={thumbnail} alt="product_img"/>  
      </div>
      <h3 className="text-gray-500 text-xs mt-2">{category}</h3>
      <h2 className="text-black text-base mt-1">{title}</h2>
      <Link to={"/product/"+id} className='text-gray-500 font-medium hover:text-gray-700'>Veiw Details</Link>
      <div className="flex mt-1">
        <img className="h-4" src="https://www.svgrepo.com/show/444861/star.svg" alt="star"/>
        <img className="h-4" src="https://www.svgrepo.com/show/444861/star.svg" alt="star"/>
        <img className="h-4" src="https://www.svgrepo.com/show/444861/star.svg" alt="star"/>
        <img className="h-4" src="https://www.svgrepo.com/show/444861/star.svg" alt="star"/>
        <img className="h-4" src="https://www.svgrepo.com/show/444861/star.svg" alt="star"/>
      </div>
      <h2 className="text-sm font-semibold mt-2">{price}</h2> 
    </div>
  );
}

export default Product;
