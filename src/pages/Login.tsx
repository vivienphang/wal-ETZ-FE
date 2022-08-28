import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

axios.defaults.withCredentials = true;
const backEndUrl = "http://localhost:7000/";

function Login() {
  const navigate = useNavigate();

  const googleLogin = async () => {
    console.log(backEndUrl);
    // axios call to get backend route: auth/google
    const page = await axios.get(`${backEndUrl}auth/google`);
    console.log(page);
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
