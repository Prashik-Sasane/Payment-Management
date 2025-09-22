import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserSignUp from "./components/UserSignUP";
import Login from "./components/Login";
import Payment from "./page/Payment";

import Transaction from "./page/Transaction";
import Layout from "./components/Layout";
import "./App.css";
import Home from './components/Home'
import StepperPage from "./page/StepperPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Pages WITHOUT navbar */}
          {/* <Route path="/" element={<UserSignUp />} /> */}
          <Route path="/login" element={<Login />} />

          {/* Pages WITH navbar using Layout */}
          <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
         <Route path="/stepper" element={<StepperPage />} />
           
            <Route path="/payment" element={<Payment />} />
            <Route path="/transaction" element={<Transaction />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
