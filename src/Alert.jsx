import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import withAlert from "./withAlert";

const themeMap = {
  success: {
    color: "bg-green-500",
    Icon: AiOutlineCheckCircle,
  },
  error: {
    color: "bg-red-500",
    Icon: MdOutlineDangerous,
  },
  Already: {
    color: "bg-orange-500",
    Icon: FaUserCheck,
  },
};

function Alert({ alert, removeAlert }) {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(removeAlert, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  if (!alert) {
    return null;
  }

  const { message, type } = alert;
  const { Icon, color } = themeMap[type];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-lg w-full z-50">
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${color} text-white`}>
        <Icon className="text-3xl mr-4" />
        <p className="flex-1 text-lg">{message}</p>
        <button
          onClick={removeAlert}
          className="underline text-white hover:text-gray-200 focus:outline-none"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default withAlert(Alert);
