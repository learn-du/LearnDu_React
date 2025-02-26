import React from 'react';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Buy from './BuyPage/Buypage';
import Sell from './SellPage/SelPage';
import ForgotPassword from './components/ForgetPassword'
import Listing from './mylistingPage/Listing';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './hooks/useAuth';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
  return (
    <AuthProvider>
      <div className='bg-white'>
        <Routes>
        <Route path="/" element={<Home />} />

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />  {/*  No ProtectedRoute */}
          <Route path="/listing" element={<Listing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <SpeedInsights />
        <Analytics />
      </div>
    </AuthProvider>
  );
}

export default App;
