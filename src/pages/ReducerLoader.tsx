import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountsContext, UserContext } from "../provider/GlobalProvider";
import getData from "../reducers/globalAction";

export default function ReducerLoader() {
  const { userState, userDispatch } = useContext(UserContext);
  const { accountsState, accountsDispatch } = useContext(AccountsContext);
  const Navigate = useNavigate();

  // get id on page load
  useEffect(() => {
    // todo: pass the id data here
    (async () => {
      const id = localStorage.getItem("id");
      if (!id) {
        return Navigate("/");
      }
      const data = await getData(id);
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
      return Navigate("/getStarted");
    }
    return Navigate("/home");
  }, [userState]);

  return (
    <div>
      <p>Loading page</p>
    </div>
  );
}
