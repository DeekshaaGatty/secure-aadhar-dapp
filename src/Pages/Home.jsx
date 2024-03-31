import React from 'react'
import Navbar from '../Components/Navbar'
import Info from '../Components/Info'
import About from '../Components/About'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div className='home-section'>
      <Navbar />
      <Info />
      <About />
      <Footer />
    </div>
  );
}

export default Home;