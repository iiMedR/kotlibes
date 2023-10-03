import React from 'react'
import NavBar from '../components/NavBar'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import Accordion from '../components/Accordion'


const PricingPage = () => {

    const activeLink = 'Pricing';

  return (
    <>
    <div className='prc-page'>
        <NavBar darkBg={false} activeLink={activeLink}/>
        <div className='prc-page-container'>
            <Pricing />
        </div>
        <Accordion />
        <Footer />
    </div>
    </>
    
  )
}

export default PricingPage