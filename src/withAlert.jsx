 
import { useContext } from "react";
import { AlertContext } from "./contexts";

const withAlert = (InputComponent) => {
  return (props) => {
    const { alert, setAlert ,removeAlert} = useContext(AlertContext);
    return <InputComponent {...props} alert={alert} setAlert={setAlert} removeAlert={removeAlert} />;
  };
};

export default withAlert;
