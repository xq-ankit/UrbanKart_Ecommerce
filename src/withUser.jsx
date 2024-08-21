import { userContext } from "./App";
import { useContext } from "react";

function withUser(IncomingComponent){
    function OutgoingComponent(props){
        const{user,setUser}=useContext(userContext);
        return <IncomingComponent {...props} user={user} setUser={setUser}/>
    }
    return OutgoingComponent;
}
export default withUser;