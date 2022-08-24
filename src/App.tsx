import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Box, Container } from "@chakra-ui/react";
import Login from "./pages/Login.tsx";
import MainPage from "./pages/MainPage.tsx";
import Records from "./pages/Records.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Signup from "./pages/Signup.tsx";

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO THE APP</h1>

      <Container maxW="450px" bg="gray.300" color="black">
        <Box padding="10" maxW="md">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/records" element={<Records />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </Box>
      </Container>
    </div>
  );
}

export default App;
