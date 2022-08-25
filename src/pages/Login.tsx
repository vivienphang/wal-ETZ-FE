import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

function Login() {
  // initialize states
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const googleLogin = () => {
    console.log("button clicked");
    // axios call to get backend route: auth/google
    try {
      axios.get("REACT_APP_BACKEND_URL/auth/google");
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
