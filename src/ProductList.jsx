import React from 'react';
import Product from './Product';
function ProductList({products}) {
  return(
    <div className="flex flex-wrap justify-evenly py-10 px-4 gap-5">
    {products.map(function(item){
      return(
      <Product
      key={item.title}
      thumbnail={item.thumbnail}
      category={item.category}
      title={item.title}
      price={item.price}
      id={item.id}
      />
  );
})}


  </div>

);

}
export default ProductList;