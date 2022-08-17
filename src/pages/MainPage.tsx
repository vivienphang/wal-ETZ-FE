import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Box } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";

const MainPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>This is the main Page</h1>
      <AccountsCarousel />
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Main Page
      </Button>
      <Button
        onClick={() => {
          navigate("/Login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/records");
        }}
      >
        Records
      </Button>
    </div>
  );
};

export default MainPage;
