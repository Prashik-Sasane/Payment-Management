import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import UserSignUp from './components/UserSignUP'
import Login from './components/Login'
import Payment from './page/Payment'
import BankTransfer from './page/Banktransfer'
import Transaction from './page/Transaction'
import Dashboard from './page/Dashboard'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} /> 
          <Route path='/' element={<UserSignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/bank' element={<BankTransfer />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/add' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
