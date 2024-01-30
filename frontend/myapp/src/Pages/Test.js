import React, { useEffect, useState } from 'react';
import NavDashboard from '../components/NavDashboard';
import Card from 'react-bootstrap/Card';
import visaIcon from '../assets/img/visa.svg'; // Adjust the path to your SVG icons
import mastercardIcon from '../assets/img/mastercard.svg'; // Adjust the path to your SVG icons
import paypalIcon from '../assets/img/paypal.svg'; // Adjust the path to your SVG icons
import InputSlider from 'react-input-slider';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import RemainingPopup from '../components/RemainingPopup';
import { InlineWidget } from "react-calendly";
//import Backdrop from '@mui/material/Backdrop';



function Upgrade() {
  // Get the card type from localStorage
  const cardType = 'visa'; // Make sure this matches your key in localStorage

  // Function to map card type to icon
  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return visaIcon;
      case 'mastercard':
        return mastercardIcon;
      case 'paypal':
        return paypalIcon;
      // Add more cases for other card types and icons
      default:
        return null;
    }
  };

  // Example card number, replace this with the actual card number
  const cardNumber = '****0000'; // Assuming this is retrieved from your database

  const cardIcon = getCardIcon(cardType);

  const [credits, setCredits] = useState(140); // Initial credits value
  const pricePerCredit = 0.2; // Price per credit in dollars
  const totalPrice = credits * pricePerCredit - 0.01;

  return (<div><NavDashboard /></div>);
}
export default Upgrade;
