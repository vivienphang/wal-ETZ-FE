import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const googleLogin = () => {
    console.log("button clicked");
  };
  return (
    <div>
      <div className="LoginPage">
        <h1>Login Page</h1>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
        <br />
        <ButtonGroup gap="5">
          <Button colorScheme="facebook" onClick={googleLogin}>
            {" "}
            Sign in with Google
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Login;
