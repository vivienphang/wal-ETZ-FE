import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

axios.defaults.withCredentials = true;

function Login() {
  // initialize states
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const googleLogin = () => {
    console.log("button clicked");

    const backEndUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("this is backend URL", backEndUrl);
    try {
      window.location.href = `${backEndUrl}/auth/google`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("this is error:", error);
    }
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
