/*
import React from 'react';
import { useState , useEffect } from 'react';
import {Nav, Navbar , Container} from "react-bootstrap";
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';


const NavBar = () =>{
  const [activeLink, setActiveLink] = useState('home');
  const homeLink = 'https://kotlibes.com/'
  const [scrolled, setScrolled] = useState(window.location.href === homeLink ? false : true);
  const [collapsed, setCollapsed] = useState(true); // Track navbar collapse state

  useEffect(() => {
    const onScroll=()=>{
      if(window.scrollY > 100){
        setScrolled(true);
    } else {
        setScrolled(false);
    }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  },[])
  const onUpdateActiveLink  = (value) => {
    setActiveLink(value);
  }

  const handleNavbarToggle = () => {
    setCollapsed((prevState) => !prevState); // Toggle navbar collapse state
  };

  return(
    <Navbar expand="lg" className={`${scrolled ? 'scrolled' : ''} ${collapsed ? '' : 'non-scrolled-bg'}`}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav" onClick={handleNavbarToggle}>
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
          <Nav.Link as={Link} to="/dashboard" className={activeLink === 'prices' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('prices')}>Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/Pricing" className={activeLink === 'Pricing' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Pricing')}>Pricing</Nav.Link>
          </Nav>
          <span className="navbar-text">
          <Link 
              to="/login"
              className="vvd"
              onClick={() => console.log('connect')}
            >
              <span>CONNEXION</span>
          </Link>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar;

*/
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';

const NavBar = ({ darkBg, activeLink }) => {
  const [scrolled, setScrolled] = useState(window.location.pathname === '/' ? false : true);
  const [collapsed, setCollapsed] = useState(true); // Track navbar collapse state

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavbarToggle = () => {
    setCollapsed((prevState) => !prevState); // Toggle navbar collapse state
  };

  return (
    <Navbar
      expand="lg"
      className={`${
        scrolled ? 'scrolled' : ''
      } ${collapsed ? '' : 'non-scrolled-bg'} ${darkBg ? '' : 'dark-bg'}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle}>
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={activeLink === 'dashboard' ? 'active navbar-link' : 'navbar-link'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Pricing"
              className={activeLink === 'Pricing' ? 'active navbar-link' : 'navbar-link'}
            >
              Pricing
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <Link to="/login" className="vvd" onClick={() => console.log('connect')}>
              <span>CONNEXION</span>
            </Link>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
