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

  useEffect(() => {
    window.createLemonSqueezy(); // Call the method after the component has mounted
  }, []);

  const handleCheckout = async () => {
    try {
      const calculatedPriceInCents = totalPrice * 100; // $3 = 300 cents

      const requestData = {
        data: {
          type: 'checkouts',
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: storeID,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: variantID,
              },
            },
          },
          attributes: {
            custom_price: calculatedPriceInCents,
            // Other attributes as needed (product_options, checkout_options, checkout_data)
            product_options: {
              name: `${credits} Kots`,
              redirect_url: 'https://kotlibes.com/login',
              receipt_link_url: 'https://kotlibes.com/login',
              receipt_thank_you_note:
                "Once again, thank you for choosing Kotlibes! We're excited to have you as a part of our community. If you have any questions or need assistance, please don't hesitate to reach out. Your success is our priority. Best regards, /n The Kotlibes Team 🌟",
            },

            checkout_options: {
              embed: true,
              discount: false,
            },

            checkout_data: {
              email: 'example@example.invalid',
              name: 'EXAMPLE_CUSTOMER',
            },
          },
        },
      };

      const response = await axios.post(
        'https://api.lemonsqueezy.com/v1/checkouts',
        requestData,
        {
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const generatedURL = response.data.data.attributes.url;
      setCheckoutURL(generatedURL);
    } catch (error) {
      console.error('Error creating checkout:', error);
      // Handle error scenario
    }
  };

  useEffect(() => {
    if (checkoutURL) {
      const checkoutLink = document.querySelector('#subscribeLink');
      if (checkoutLink) {
        // Simulate a click on the hidden <a> element to trigger the checkout overlay
        checkoutLink.click();
      }
    }
  }, [checkoutURL]);

  return (<div><NavDashboard /></div>);
}
export default Upgrade;
