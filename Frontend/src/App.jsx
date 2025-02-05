import React from 'react'
import Home from './Home/Home' 
import {Route,Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Buy from './BuyPage/Buypage'
import Sell from './SellPage/SelPage'
import Listing from './mylistingPage/Listing'

function App() {
  return (
   <>
    <div className='bg-white'>
      
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/buy" element={<Buy/>}/>
      <Route path="/sell" element={<Sell/>}/>
      <Route path="/listing" element={<Listing/>}/>
      </Routes>
    
    </div>
    </> 
  )
}

export default App
