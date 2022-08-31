import React, { useState } from "react";
import AccountList from "../components/AccountList";
import RecordsList from "../components/RecordsList";

function Records() {
  const [acc, setAcc] = useState("");
  const [rec, setRec] = useState([]);

  return (
    <div>
      <h1>This is the page with all money records</h1>
      <AccountList acc={acc} setAcc={setAcc} />
      <RecordsList acc={acc} rec={rec} setRec={setRec} />
    </div>
  );
}

export default Records;
