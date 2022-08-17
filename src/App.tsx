import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.tsx";
import MainPage from "./pages/MainPage.tsx";
import Records from "./pages/Records.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Signup from "./pages/Signup.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/records" element={<Records />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
