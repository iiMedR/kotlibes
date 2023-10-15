import React, { useEffect, useState } from 'react';
import NavDashboard from '../components/NavDashboard';
import Card from 'react-bootstrap/Card';
import visaIcon from '../assets/img/visa.svg'; // Adjust the path to your SVG icons
import mastercardIcon from '../assets/img/mastercard.svg'; // Adjust the path to your SVG icons
import creditCardDefault from '../assets/img/creditDefault.svg'; // Adjust the path to your SVG icons
import paypalIcon from '../assets/img/paypal.svg'; // Adjust the path to your SVG icons
import InputSlider from 'react-input-slider';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

function Upgrade() {
  const apiKey = process.env.REACT_APP_LEMONSQUEEZY_API_KEY;
  const storeID = '35944';
  const variantID = '117823'; // Replace with the actual variant ID

  const [checkoutURL, setCheckoutURL] = useState('');
  const [plan, setPlan] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardIcon, setCardIcon] = useState(null);

  const [credits, setCredits] = useState(140); // Initial credits value
  const pricePerCredit = 0.2; // Price per credit in dollars
  const totalPrice = credits * pricePerCredit - 0.01;

  useEffect(() => {
    // Retrieve values from secureLocalStorage and set them in state variables
    const storedPlan = secureLocalStorage.getItem('pl');
    const storedDaysRemaining = secureLocalStorage.getItem('rd');
    const storedCardType = secureLocalStorage.getItem('cb');
    const storedCardNumber = secureLocalStorage.getItem('clf');
    console.log(secureLocalStorage.getItem('rd'))

    setPlan(storedPlan);
    setDaysRemaining(storedDaysRemaining);
    setCardType(storedCardType);
    setCardNumber(storedCardNumber);

    // Function to map card type to icon
    switch (storedCardType) {
      case 'visa':
        setCardIcon(visaIcon);
        break;
      case 'mastercard':
        setCardIcon(mastercardIcon);
        break;
      case 'paypal':
        setCardIcon(paypalIcon);
        break;
      default:
        setCardIcon(creditCardDefault);
        break;
    }
  }, []);

  return (<div><NavDashboard /></div>);
}
export default Upgrade;
