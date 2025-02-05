import React from 'react'
import MyListings from '../components/Mylisting'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Listing() {
  return (
    <div>
      <Navbar/>
      <MyListings/>
      <Footer/>
    </div>
  )
}

export default Listing
