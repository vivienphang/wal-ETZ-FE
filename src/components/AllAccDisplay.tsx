import React, { useState, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AccountsContext } from "../provider/GlobalProvider";
import { allAccDisplayPropInterface } from "../types/propInterface";

export default function AllAccDisplay(props: allAccDisplayPropInterface) {
  // Gettin account state
  const { accountsState } = useContext(AccountsContext);
  const { chosenAcc, setChosenAcc } = props;
  const settingAcc = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Use current Target instead of target
    // Dont know why target doesnt work
    // Setting the chosneAcc
    setChosenAcc(e.currentTarget.value);
  };
  const accountList = accountsState!.map((account) => (
    // Setting the account
    <Button key={account._id} onClick={settingAcc} value={account._id}>
      {account.accName}
    </Button>
  ));
  return (
    <div>
      <h1>Show all accounts as buttons</h1>
      <div>{accountList}</div>
    </div>
  );
}
