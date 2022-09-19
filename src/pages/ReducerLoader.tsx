import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Center } from "@chakra-ui/react";
import {
  AccountsContext,
  ExchangeRateContext,
  UserContext,
} from "../provider/GlobalProvider";
import { getData } from "../reducers/globalAction";

export default function ReducerLoader() {
  const { userState, userDispatch } = useContext(UserContext);
  const { accountsState, accountsDispatch } = useContext(AccountsContext);
  const { exchangeRateDispatch } = useContext(ExchangeRateContext);
  const navigate = useNavigate();

  const [firstRun, setFirstRun] = useState(false);

  // get id on page load
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      document.cookie = `id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (!token) {
        return navigate("/");
      }
      const data = await getData(token);
      if (data === "error") {
        localStorage.clear();
        return navigate("/");
      }
      accountsDispatch!(data.accountAction);
      userDispatch!(data.userAction);
      exchangeRateDispatch!(data.exchangeRateAction);
      return null;
    })();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      setFirstRun(true);
      return;
    }
    if (!userState?._id) {
      navigate("/");
      return;
    }
    if (accountsState?.length === 0) {
      navigate("/getStarted");
      return;
    }
    navigate("/home");
  }, [userState]);

  return (
    <div>
      <Center>
        <Image
          boxSize="130px"
          borderRadius="20px"
          src="./images/aureus.png"
          alt="Aureus Logo"
        />
      </Center>
    </div>
  );
}
