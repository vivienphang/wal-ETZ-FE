import React, { useState, useEffect, useContext } from "react";
import { Button, HStack, VStack, Input, Textarea } from "@chakra-ui/react";
import CategoryList from "../atoms/CategoryList";
import AccountList from "../components/AccountList";
import { addRecord } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { AccountsContext } from "../provider/GlobalProvider";

export default function AddRecord() {
  const initData = {
    amount: "",
    isExpense: false,
    recordName: "",
    recordComment: "",
    recordCategory: "",
    recordPhoto: "",
    recordDate: "",
  };

  const { accountsDispatch } = useContext(AccountsContext);
  const [acc, setAcc] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState<addRecordInterface>(initData);

  const isET = () => {
    setData({ ...data, isExpense: true });
  };
  const isEF = () => {
    setData({ ...data, isExpense: false });
  };
  const addAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitization = e.target.value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    console.log(sanitizedValue);
    setData({ ...data, amount: sanitizedValue });
  };
  const addDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, recordDate: e.target.value });
  };
  const addName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, recordName: e.target.value });
  };
  const addComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, recordComment: e.target.value });
  };

  const createRecord = async () => {
    // todo: update reducer here
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(data);
    accountsDispatch!(await addRecord({ ...data, token }));
  };

  useEffect(() => {
    setData({ ...data, recordCategory: cat });
  }, [cat]);
  useEffect(() => {
    setData({ ...data, acc });
  }, [acc]);

  return (
    <div>
      <h1>New Record</h1>
      <AccountList acc={acc} setAcc={setAcc} />
      <HStack>
        <VStack>
          <Button onClick={isEF}>+</Button>
          <Button onClick={isET}>-</Button>
        </VStack>
        <Input placeholder="Enter Amount" type="number" onChange={addAmount} />
      </HStack>
      <Input
        placeholder="Date And Time"
        type="datetime-local"
        onChange={addDate}
      />
      <Input placeholder="Record Name" type="string" onChange={addName} />
      <CategoryList setCat={setCat} cat={cat} isExpense={data.isExpense!} />
      <Textarea
        placeholder="Here is a sample placeholder"
        size="sm"
        resize="none"
        onChange={addComment}
      />
      <Button onClick={createRecord}>Create Record</Button>
    </div>
  );
}
