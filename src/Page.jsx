import React from "react";

function Page(data){
  return (
    <button className="flex h-8 w-8 hover:bg-red-600 justify-center items-center text-xs text-red-500 border-2 border-red-600 bg-white hover:text-white mr-1">
      {data.no}
    </button>
  );
}

export default Page;