import React from 'react';
import Product from './Product';
  function ProductList({products}) {
    return (
      <div className="flex flex-wrap justify-center gap-5 py-10 px-4">
        {products.map((items) => (
          <Product key={items.id} {...items} /> 
        ))}  
      </div>
    );
  }
  
  export default ProductList;
  