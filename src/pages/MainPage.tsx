import React from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Box } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";

const MainPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>This is the main Page</h1>
      <AccountsCarousel />
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

export default MainPage;
