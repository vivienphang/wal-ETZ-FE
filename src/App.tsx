import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Records from "./pages/Records";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import BalanceChart from "./components/BalanceChart";
import InitAccount from "./pages/InitAccount";
import NewAccount from "./pages/NewAccount";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/records" element={<Records />} />
          <Route path="/balanceChart" element={<BalanceChart />} />
          <Route path="/getStarted" element={<InitAccount />} />
          <Route path="/newAccount" element={<NewAccount />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
