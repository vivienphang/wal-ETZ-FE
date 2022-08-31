import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Records from "./pages/Records";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import BalanceChart from "./components/BalanceChart";
import InitAccount from "./pages/InitAccount";
import NewAccount from "./pages/NewAccount";
import HomePage from "./pages/HomePage";
import GlobalProvider from "./provider/GlobalProvider";
import ReducerLoader from "./pages/ReducerLoader";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/records" element={<Records />} />
            <Route path="/balanceChart" element={<BalanceChart />} />
            <Route path="/getStarted" element={<InitAccount />} />
            <Route path="/newAccount" element={<NewAccount />} />
            <Route path="/loading" element={<ReducerLoader />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
