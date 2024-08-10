import React from "react";
import { PiSpinnerLight } from "react-icons/pi";

function LoadingPage(){
    return <div className="grow  flex justify-center items-center"><PiSpinnerLight  className="text-5xl animate-spin" /></div>;
}
export default LoadingPage;