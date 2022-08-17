/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Box } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";

function MainPage() {
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
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/signup");
        }}
      >
        SignUp
      </Button>
    </div>
  );
}

export default MainPage;
