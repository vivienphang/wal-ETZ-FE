import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>This is the error handling page</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Main Page
      </button>
      <button
        onClick={() => {
          navigate("/Login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/records");
        }}
      >
        Records
      </button>
    </div>
  );
};

export default ErrorPage;
