import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountsContext, UserContext } from "../provider/GlobalProvider";
import getData from "../reducers/globalAction";

export default function ReducerLoader() {
  const { userState, userDispatch } = useContext(UserContext);
  const { accountsState, accountsDispatch } = useContext(AccountsContext);
  const navigate = useNavigate();

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
      console.log(data);
      accountsDispatch!(data.accountAction);
      userDispatch!(data.userAction);
      return null;
    })();
  }, []);

  useEffect(() => {
    console.log("ACC STATE", accountsState, "USER STATE", userState);
    if (!userState?._id) {
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
      <p>Loading page</p>
    </div>
  );
}
