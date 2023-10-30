import React, { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";
import Backdrop from '@mui/material/Backdrop';


const RemainingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [status , setStatus] = useState('')

  useEffect(() => {
    // Get the remaining days from secureLocalStorage and convert it to an integer
    const days = parseInt(secureLocalStorage.getItem('rd'), 10);

    // Check if remainingDays is less than or equal to 2 and greater than 0 to show the popup
    if (days > 0 && days <= 2) {
      setShowPopup(true);
      setRemainingDays(days);
      setStatus("active");
    } else if (days === 0) {
      setShowPopup(true);
      setStatus("inActive");
    } else {
      setShowPopup(false);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        // Replace this with your popup design and content
        <div className="popup">
          {status === "active" ? (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showPopup}
              onClick={handleClose}
            >
              <h1 style={{backgroundColor: 'black', height: '500px', width:'900px'}}>active account with {remainingDays} days remaining.</h1>
            </Backdrop>
          ) : (
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showPopup}
            onClick={handleClose}
          >
            <p>You're account is inactive with {remainingDays} days remaining.</p>
          </Backdrop>
          )}
        </div>
      )}
    </>
  );
};

export default RemainingPopup;
/**
 import React, { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";
import Backdrop from '@mui/material/Backdrop';


const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [status , setStatus] = useState('')

  useEffect(() => {
    // Get the remaining days from secureLocalStorage and convert it to an integer
    const days = parseInt(secureLocalStorage.getItem('rd'), 10);

    // Check if remainingDays is less than or equal to 2 and greater than 0 to show the popup
    if (days > 0 && days <= 2) {
      setShowPopup(true);
      setRemainingDays(days);
      setStatus("active");
    } else if (days === 0) {
      setShowPopup(true);
      setStatus("inActive");
    } else {
      setShowPopup(false);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
    <h2>hello word</h2>
      {showPopup && (
        // Replace this with your popup design and content
        <div className="popup">
          {status === "active" ? (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showPopup}
              onClick={handleClose}
            >
              <h1>active account with {remainingDays} days remaining.</h1>
            </Backdrop>
          ) : (
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showPopup}
            onClick={handleClose}
          >
            <p>You're account is inactive with {remainingDays} days remaining.</p>
          </Backdrop>
          )}
        </div>
      )}
    </>
  );
};

export default Popup;

 */