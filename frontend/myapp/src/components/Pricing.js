import React, { useState , useEffect } from "react";
//import Slider from '@mui/material/Slider';
//import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import InputSlider from 'react-input-slider'; // Import the slider component

function Pricing() {
  const [sliderValue, setSliderValue] = useState(1);

  const navigate = useNavigate();

  const PremiumhandleSubscribeClick = () => {
    //window.location.href = "/login?signup=true";
    navigate(`/login?signup=true&co=${selectedPremiumPlan.link[sliderValue - 1]}`);
  };

  const handleSubscribeClick = () => {
    //window.location.href = "/login?signup=true";
    navigate(`/login?signup=true&co=40b5ce07-2eff-4321-a122-4579fa6e3bd9`);
  };

  useEffect(() => {
    window.createLemonSqueezy(); // Call the method after component has mounted
  }, []);

  const plans = [
    {
      name: "Payed Trial",
      price: "$3.99",
      period: "/one week",
      features: [
        "Access to SMM Studio",
        "Access to emails toolkit",
        "Access to advertising Toolkit",
        "Period of one week only",
      ],
      credits: "Credits: 12",
    },
    {
      name: "Premium",
      prices: ["$49.99", "$59.99", "$69.99", "$79.99", "$89.99", "$99.99", "$109.99", "$119.99", "$129.99", "$139.99"],
      period: "/month",
      features: [
        "Access to SMM Studio",
        "Access to Strategic growth suite",
        "Access to Advertising Toolkit",
        "Access to relationships handler",
        "Access to Emails Toolkit",
        "Access to Products Toolkit",
        "Access to SEO Toolbox",
      ],
      credits: `Credits: ${250 + (sliderValue - 1) * 50}`,
      free: `${0 + (sliderValue - 1) * 10} free`,
      link: [
        "bb68a7e5-9aa7-40e8-8805-cc1b13ed5eac",
        "7d21bc13-6019-461c-bdb9-946892e83848",
        "6f4a0500-6a71-4283-abd9-028502f48975",
        "54e84f76-194f-4a27-a1e1-d75a63cf639b",
        "5870fc81-5df9-4b32-8a69-effb95084c1d",
        "f7ff3fef-f4cf-4c1d-a874-e305ba5f97ad",
        "5070f957-212a-4ce7-9955-2505386e1d8a",
        "f3349904-9904-466b-b4e4-d79eea662e92",
        "4fb97ff6-5386-42b6-a3df-1a47c6fda330",
        "c265d1d7-5a6a-45fe-b032-17029704a331",
      ]  
    },
    {/*
      name: "Platinum",
      prices: [
        "$589.99", "$707.99", "$825.99", "$943.99", "$1061.99",
        "$1179.99", "$1297.99", "$1415.99", "$1533.99", "$1651.99"
      ],
      period: "/year",
      features: [
        "Access to SMM Studio",
        "Access to Strategic growth suite",
        "Access to Advertising Toolkit",
        "Access to relationships handler",
        "Access to Emails Toolkit",
        "Access to Products Toolkit",
        "Access to SEO Toolbox",
      ],
      credits: `Credits: ${250 * 12 + (sliderValue - 1) * 50 * 12}`,
    */},
  ];

  /*const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const PrettoSlider = styled(Slider)({
    color: '#1e59fa',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
  });*/

  const selectedPremiumPlan = plans[1];
  const selectedPlatinumPlan = plans[2];

  return (
    <>
      <h1 className="pricing-title">Choose The <span className="title-blue">Plan</span> That Suits You</h1>
      <div className="pricing">
        <div className="plan">
          <h2 className="plan-name">{plans[0].name}</h2>
          <p className="plan-price">{plans[0].price}<span className="plan-period">{plans[0].period}</span></p>
          <p className="credits">{plans[0].credits}</p>
          <ul className="plan-features">
            {plans[0].features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="subscribe-btn" >Subscribe</button>
        </div>
        {/**
         <div className="plan">
          <h2 className="plan-name">{selectedPlatinumPlan.name}</h2>
          <p className="plan-price">{selectedPlatinumPlan.prices[sliderValue - 1]}<span className="plan-period">{selectedPlatinumPlan.period}</span></p>
          <p className="credits">{selectedPlatinumPlan.credits}</p>
          <ul className="plan-features">
            {selectedPlatinumPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="subscribe-btn" >Subscribe</button>
        </div>
         */}
      </div>
    </>
  );
}

export default Pricing;