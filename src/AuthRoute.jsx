import React from "react";
import { Navigate } from "react-router";
import withUser from "./withUser";

function useRoute({children,user}){
    if(user){
        return <Navigate to="/"/>;
    }
    return children
}
export default withUser(useRoute);