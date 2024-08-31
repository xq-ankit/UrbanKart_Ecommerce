import React, { useEffect, useState, useCallback } from "react";
import ProductList from "./ProductList";
import { getProductList } from "./api";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { range } from "lodash";
import { useSearchParams, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function Home() {
  const [proList, setProList] = useState({ meta: {}, data: [] });
  const [loading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  let { query, sort, page } = params;

  query = query || "";
  sort = sort || "default";
  page = +page || 1;

  useEffect(() => {
    let sortBy;
    let sortType;

    if (sort == "title") {
      sortBy = "title";
    }
    else if (sort === "Low to high") {
      sortBy = "price";
    }
    else if (sort == "highToLow") {
      sortBy = "price";
      sortType = "desc";
    }
    getProductList(sortBy, query, page, sortType).then(function (xyz) {
      setProList(xyz);
      setLoading(false);
    });
  }, [sort, query, page]);

  let data = [...proList.data];
  const handelonSearch = useCallback(
    function (event) {
      // setQuery(event.target.value);
      setSearchParams({ ...params, query: event.target.value});
    },
    [query]
  );
  const handelonSort = useCallback(function (event) {
    //   setSort(event.target.value);
    setSearchParams({ ...params, sort: event.target.value,page:1});
  });

  function handlePageChange(newPage) {
    setSearchParams({ ...params, page: newPage });
  }

  if (proList.length == 0) {
    return (<LoadingPage/>
    );
  }
  return (
    <div className="  flex flex-col grow max-w-5xl mx-auto px-9 py-10 my-16 -2 bg-white ">
      <div className=" flex  justify-between  ">
        <input
          value={query}
          type="text"
          placeholder="Search"
          className=" placeholder-black border border-black rounded-md  lg:ml-8 h-8  mt-2 lg:mt-2 lg:mb-2 text-center lg:w-40 w-34"
          onChange={handelonSearch}
        />
        <select
          className="border border-gray-400 bg-white my-2 mx-2 w-32 h-8 rounded-md "
          onChange={handelonSort}
          value={sort}
        >
          <option value="default">Default sorting</option>
          <option value="title">Sort by Name</option>
          <option value="Low to high"> Price (Low to high)</option>
          <option value="highToLow"> Price (High to Low)</option>
        </select>
      </div>
      {<ProductList products={proList.data} />}
      {proList.data.length == 0 && <LoadingPage/>}

      <div className="mt-6   flex items-center mb-2 ml-8 gap-1">
    {page > 1 && (
  <HiArrowNarrowLeft
    className="text-3xl text-red-600 border border-orange-400"
    onClick={() => handlePageChange(page - 1)}
  />
)}
{range(page, page === proList.meta.last_page ? page + 1 : page + 2).map((PageNo) => (
  <Link
    key={PageNo}
    to={"?" + new URLSearchParams({ ...params, page: PageNo })}
    className={`border border-red-600 py-1 px-4 ${page === PageNo? "bg-red-400" : ""}`}
    href=""
  >
    {PageNo}
  </Link>
))}
 {page < proList.meta.last_page && (
          <HiArrowNarrowRight
            className="text-3xl text-red-600 border border-orange-400"
            onClick={() => handlePageChange(page + 1)}
          />
        )}
    </div>
   </div>
  );
}

export default Home;
