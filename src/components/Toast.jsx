import React, { useState, useEffect } from "react";

const Toast = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleShowToast = (event) => {
      setMessage(event.detail.message);
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    };

    window.addEventListener("showToast", handleShowToast);

    return () => {
      window.removeEventListener("showToast", handleShowToast);
    };
  }, []);

  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
};

export default Toast;
