import { Select } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AccountsContext } from "../provider/GlobalProvider";
import { accountListPropInterface } from "../types/propInterface";

export default function AccountList(prop: accountListPropInterface) {
  const { setAcc, acc } = prop;
  const selectAcc: React.FormEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAcc!(e.target.value);
  };
  const { accountsState } = useContext(AccountsContext);
  const accountsList = accountsState?.map((account) => (
    <option key={account._id} value={account._id}>
      {`${account.accName} (${account.accCurrency})`}
    </option>
  ));
  return (
    <div>
      <Select placeholder="Pick Account" value={acc} onChange={selectAcc}>
        {accountsList}
      </Select>
    </div>
  );
}
