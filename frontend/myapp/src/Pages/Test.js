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

  /*********************************** */
  const apiKey = 'REPLACE_WITH_YOUR_KEY';
  const storeID = '35944';
  const variantID = '117823'; // Replace with the actual variant ID
  
  const [checkoutURL, setCheckoutURL] = useState('');

  useEffect(() => {
    window.createLemonSqueezy(); // Call the method after component has mounted
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
              receipt_link_url: "https://kotlibes.com/login",
              receipt_thank_you_note: "Once again, thank you for choosing Kotlibes! We're excited to have you as a part of our community. If you have any questions or need assistance, please don't hesitate to reach out. Your success is our priority. Best regards, /n The Kotlibes Team 🌟",
            },

            checkout_options:{
              embed: true,
              discount: false,
            },

            checkout_data:{
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
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const generatedURL = response.data.data.attributes.url;
      setCheckoutURL(generatedURL);

      // Redirect the user to the checkout URL
      //window.location.href = checkoutURL;
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

  /**************************billing plan */

  const [planStatus, setPlanStatus] = useState('');
  useEffect(() => {
    // Retrieve plan status from secretLocalStorage
    const storedStatus = secureLocalStorage.getItem('pl');
    setPlanStatus(storedStatus);
  }, []);

  return (
    <div>
      <RemainingPopup />
      <NavDashboard />
      <div className='billingContainer'>
        <Card className='planCard'>
          <Card.Body>
            <div className='titleSection'>
              <Card.Title>{secureLocalStorage.getItem('pl')} Plan</Card.Title>
              <h6 className='days-remaining'>30 days remaining</h6>
            </div>
            <p>Include up to 15 tools that help your business grow</p>
            <Card className='creditCard'>
              <Card.Body className='cardBody'>
                <section className='iconSection'>
                  {cardIcon && <img src={cardIcon} alt={cardType} className='icon-small' />}
                </section>
                <section className='infoSection'>
                  <h6>{cardType} {cardNumber}</h6>
                  <h6>{secureLocalStorage.getItem('n')}</h6>
                </section>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        <div className='addCreditsContainer'>
          <h2 className='planTitle' style={{textAlign: 'left'}}>Credits 💰</h2>
            <div style={{ width: '80%', display:'flex', fjustifyContent: 'center', margin: '0 auto'}}>
                <InputSlider style={{ width: '100%' , textAlign: 'center', marginBottom: '25px', marginTop: '25px'}}
                axis='x'
                x={credits}
                xmax={1000}
                xmin={30}
                xstep={10}
                onChange={({ x }) => setCredits(x)}
                styles={{
                    track: {
                    backgroundColor: '#1e59fa60'
                    },
                    active: {
                    backgroundColor: '#1e59fa'
                    },
                    thumb: {
                    border: '2px solid #1e59fa',
                    backgroundColor: '#fff',
                    height: '25px',
                    width: '25px'
                    }
                }}
                />
            </div>


          <div className={'addCredits'} style={{ backgroundColor: '#4e7bf860' }} >
              <h2 className="planCardName" style={{ background: '#1e59fa', color: 'white', padding: '10px', borderRadius: '10px',   textAlign: 'center'}}>{credits} Kots</h2>
              <p className="planCardPrice" style={{  color: '#1e59fa', textAlign: 'center'}}>${totalPrice.toFixed(2)}</p>
              <p style={{  color: '#1e59fa', fontSize: '14px'}}>Your credits to unlock tools on our platform.<br/>More KOTS means more tools at your fingertips.</p>
              <button className="subscribePlanBtn" onClick={handleCheckout}>Purchase KOTS</button>
              <a id="subscribeLink" href={checkoutURL} className="subscribe-btn lemonsqueezy-button" style={{ display: 'none' }}>Subscribe</a><script src="https://assets.lemonsqueezy.com/lemon.js" defer></script><br/>
          </div>
        </div>

        <div className='PlanContainer'>
          <h2 className='planTitle'>Plans & Billing 🧾</h2>
          <p>Your Current Plan is: {secureLocalStorage.getItem('pl')}</p>
          <div className='planCardsContainer'>
            <div
              className={`premiumPlan ${planStatus === 'Premium' ? 'activePlan' : ''}`}
              style={{ backgroundColor: '#f5ca9a60'}}
            >
              {planStatus === 'Premium' && <div className="planStatusCircle"></div>}
              {planStatus !== 'Premium' && <div className="planInactiveStatus"></div>}
              <h2 className="planCardName" style={{ color: '#f0b87a'}}>Premium</h2>
              <p className="planCardPrice" style={{ color: '#f0b87a'}}>$49.99<span className="planCardPeriod" style={{ color: '#f0b87a'}}>/month</span></p>
              <p className="planCredits" style={{ background: '#e8ab68'}}>260 Kots</p>
              <button className="subscribePlanBtn" style={{ color: '#f0b87a'}}>{planStatus === 'Premium' ? 'Subscribe' : 'Change Plan'}</button>
            </div>

            <div
              className={`platinumPlan ${planStatus === 'Platinum' ? 'activePlan' : ''}`}
              style={{ backgroundColor: '#4e7bf860' }}
            >
              {planStatus === 'Platinum' && <div className="planStatusCircle"></div>}
              {planStatus !== 'Platinum' && <div className="planInactiveStatus"></div>}
              <h2 className="planCardName" style={{  color: '#1e59fadd'}}>Platinum</h2>
              <p className="planCardPrice" style={{  color: '#1e59fadd'}}>$589.99<span className="planCardPeriod" style={{  color: '#1e59fadd'}}>/year</span></p>
              <p className="planCredits" style={{ background: '#1e59fadd'}}>3000</p>
              <button className="subscribePlanBtn">{planStatus === 'Platinum' ? 'Subscribe' : 'Change Plan'}</button>
            </div>

          </div>
          <InlineWidget styles={{height:'700px'}} url="https://calendly.com/ii-medr4321/consultation" />
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
