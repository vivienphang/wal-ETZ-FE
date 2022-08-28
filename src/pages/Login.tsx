/* eslint-disable react/no-children-prop */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
// import { FaUserAlt, FaLock } from "react-icons/fa";

axios.defaults.withCredentials = true;

// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

function Login() {
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  // initialize states
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const googleLogin = () => {
    console.log("button clicked");
    window.location.href = `${backEndUrl}/auth/google`;
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
