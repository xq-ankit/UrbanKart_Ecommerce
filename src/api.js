import axios from "axios";

export function getProductData(id) {
  return axios.get(" https://myeasykart.codeyogi.io/product/" + id).then(function(response){
    return response.data
  })
}

export  function getProductByIds(ids){
  const commaSepeartedIds = ids.join();
  return axios.get("https://myeasykart.codeyogi.io/products/bulk",{
      params:{
          ids :commaSepeartedIds,
      },
  })
  .then(function(response){
      return response.data;
  })
}
export function getProductList(sortBy ,query,page,sortType) {
  let params={};
  if (sortBy) {
      params.sortBy = sortBy;
  }
  if(query){
      params.search = query;
  }

  if(page){
      params.page = page;
  }
  if(sortType){
      params.sortType=sortType;
  }
  
  return axios.get("https://myeasykart.codeyogi.io/products",
      {
          params,
          headers:{
              Authorization: localStorage.getItem("token"),
          },


  })
  .then(function (response) {
      return response.data;
      
  });

}
export function saveCart(cart){
    return axios.post("https://myeasykart.codeyogi.io/carts", { data: cart }, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    })
    .then(function (response) {
        console.log("Cart saved successfully:", response.data);
        return response.data;
    })
    .catch(function (error) {
        console.error("Error saving cart:", error);
        throw error;
    });
  }
  
  export function getCart() {
    return axios.get("https://myeasykart.codeyogi.io/carts", {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    })
    .then(function (response) {
        console.log("Cart retrieved successfully:", response.data);
        return response.data;
    })
    .catch(function (error) {
        console.error("Error retrieving cart:", error);
        throw error;
    });
  }
  