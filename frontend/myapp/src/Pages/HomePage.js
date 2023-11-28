import React from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Multicarousel from '../components/multicarousel'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import Story from '../components/Story'
import Facts from '../components/Facts'
import Accordion from '../components/Accordion'

const HomePage = () => {

  const activeLink = 'home';

  return (
    <>
    <NavBar darkBg={true} activeLink={activeLink}/>
    <Banner />
    <Multicarousel />
    <Facts />
    <Story />
    <Accordion />
    <Pricing />
    <Footer />
    </>
    
  )
}

export default HomePage