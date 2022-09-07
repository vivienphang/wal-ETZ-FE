import { Select } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AccountsContext } from "../provider/GlobalProvider";

interface Props {
  setAcc: any;
  acc: any;
}
export default function AccountList({ setAcc, acc }: Props) {
  const selectAcc = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAcc(e.target.value);
  };
  const { accountsState } = useContext(AccountsContext);
  const accountsList = accountsState?.map((account) => (
    // eslint-disable-next-line no-underscore-dangle
    <option key={account._id} value={account.accName}>
      {account.accName}
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
