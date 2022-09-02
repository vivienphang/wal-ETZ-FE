import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OauthLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const loader = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/oauth`
      );
      const { token } = loader.data;
      localStorage.setItem("token", token);
      navigate("/loading");
    })();
  });

  return <div> loading for oauth</div>;
}
