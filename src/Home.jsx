import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import Page from './Page';
// import alldata from './DummyData'; 
import { getProductList } from './api';

function Home() {
  const [query, setQuery] = useState("Default");
  const [data, setData] = useState([]);

   useEffect(function(){
    const promise=getProductList();
    promise.then(function(response){
      setData(response);
    })
   },[])




  function handleSort(e) {
    const sortingQuery = e.target.value;

    if (sortingQuery === "pricedec") {
      setData([...data].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
    } else if (sortingQuery === "priceInc") {
      setData([...data].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
    } else if (sortingQuery === "A-Z") {
      setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sortingQuery === "Z-A") {
      setData([...data].sort((a, b) => b.title.localeCompare(a.title)));
    }

    setQuery(sortingQuery);
  }

  return (
    <div className="flex flex-col bg-gray-100 max-h-screen py-10 overflow-scroll">
      <div  className="bg-white mx-4 md:mx-20 lg:mx-80 my-10 py-20 ">
        <div className="px-4 md:px-8 lg:px-20 flex justify-end py-4">
          <select
            className="text-sm py-2 px-3 bg-gray-300 rounded-md border border-gray-400"
            name="sort"
            id="def-sorting"
            value={query}
            onChange={handleSort}
          >
            <option value="Default">Default sorting</option>
            <option value="pricedec">Price: High-Low</option>
            <option value="priceInc">Price: Low-High</option>
            <option value="A-Z">Sort by A-Z</option>
            <option value="Z-A">Sort by Z-A</option>
          </select>
        </div>
        <ProductList products={data} />
        <div className="flex  space-x-4 mx-4 md:mx-10 lg:mx-20 my-6">
          <Page no="1" />
          <Page no="2" />
          <Page no="→" />
        </div>
      </div>
    </div>
  );
}
  

export default Home;
