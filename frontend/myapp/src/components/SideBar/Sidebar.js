import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react'
import "../../App.css";
import { SidebarData } from './SidebarData';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import secureLocalStorage from 'react-secure-storage';
import MenuIcon from '@mui/icons-material/Menu';

function ResponsiveExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
    secureLocalStorage.removeItem('n');
    secureLocalStorage.removeItem('e');
    secureLocalStorage.removeItem('au');
    secureLocalStorage.removeItem('i');
  }


  return (
    <>
      <Button
        variant="primary"
        className="d-lg-none"
        onClick={handleShow}
        style={{
          position: "fixed",
          backgroundColor: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          fontSize: "24px", // Adjust the font size as needed
          color: "#000",    // Adjust the icon color as needed
          cursor: "pointer",
        }}
      >
        <MenuIcon />
      </Button>

      <Offcanvas show={show} onHide={handleClose} responsive='lg' style={{ backgroundColor: '#1e59fa', width: '300px' }}>
        <Offcanvas.Header >
            <Offcanvas.Title>
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="side-bar">
          <ul className='sidebarList'>
          <Link to="/">
            <img className='logo-sidebar' src={logo} alt="Logo" />
            </Link>
            {SidebarData.map((val, key)=>{
              return(
                <Link to={val.link} id="sidebare-link">
                  <li className='row' key={key} id={window.location.pathname === val.link ? "active" : ""} >
                      <div id='icon'>{val.icon}</div>  <div id='tit'>{val.title}</div>
                  </li>
                </Link>
              )
            })}
                <Link to="/" id="sidebare-link">
                  <li className='row' id={window.location.pathname === "/" ? "active" : ""} onClick={logOut} >
                      <div id='icon'><LogoutIcon /></div>  <div id='tit'>Logout</div>
                  </li>
                </Link>
            </ul>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;


