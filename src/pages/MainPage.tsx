/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

// import AccountsCarousel from "../components/AccountsCarousel.tsx";

function MainPage() {
  const navigate = useNavigate();

  const google = () => {
    console.log("button clicked");
    window.open("http://localhost:7000/auth/google");
  };

  return (
    <div className="MainPage">
      {/* <AccountsCarousel /> */}
      {/* <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Main Page
      </Button> */}
      {/* <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button> */}
      {/* <Button>Google</Button> */}
      <Button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign up
      </Button>
      <br />
      <ButtonGroup gap="5">
        <Button colorScheme="facebook" onClick={google}>
          {" "}
          Sign in with Google
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MainPage;
