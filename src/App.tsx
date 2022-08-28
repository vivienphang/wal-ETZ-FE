import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import Records from "./pages/Records.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Signup from "./pages/Signup.tsx";
import BalanceChart from "./components/BalanceChart.tsx";
import MainProvider from "./provider/mainProvider.tsx";

function App() {
  return (
    <div className="App">
      <MainProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/records" element={<Records />} />
            <Route path="/balanceChart" element={<BalanceChart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </MainProvider>
    </div>
  );
}

export default App;
