/*
import React from 'react'
import secureLocalStorage from 'react-secure-storage';
//import Loader from '../components/Loader';
import { Card, /*Button*/ /*} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function dashboardHome() {

  const data = [
    { day: 'Mon', usage: 100 },
    { day: 'Tue', usage: 150 },
    { day: 'Wed', usage: 120 },
    { day: 'Thu', usage: 200 },
    { day: 'Fri', usage: 180 },
    { day: 'Sat', usage: 250 },
    { day: 'Sun', usage: 500 },
  ];

  return (
    <div className='dashboardHome'>
      <div className='welcome'>
          <h3>Hello, {secureLocalStorage.getItem('n')}</h3>
          {/************************************************************* *//*}
          <div className="dashboardContainer">

{ /*           <div className='dashboardMS'>
              <Card>
                <Card.Body>
                  <Card.Title>Dashboard Title</Card.Title>
                  <Card.Text>Description</Card.Text>
                  <Button variant="primary">Button 1</Button>{' '}
                  <Button variant="secondary">Button 2</Button>
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                    <span>75%</span>
                  </div>
                </Card.Body>
              </Card>
  </div>*//*}
            <div className='DashboardDailyUsage'>
              <h2>Usage:</h2>

              <div className="usage-cards-wrapper">
                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>Daily</Card.Title>
                    <Card.Text>you saved  25$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h3>6</h3>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>Monthly Usage</Card.Title>
                    <Card.Text>you saved  300$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h3>190</h3>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>Yearly Usage</Card.Title>
                    <Card.Text>you saved  4000$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h3>2160</h3>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className='dashboardWeeklyChart'>
              <h2>Usage Chart:</h2>
              <div className="chart-container">
                <LineChart width={window.innerWidth - 380} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                </LineChart>
              </div> 
            </div> 
          </div>
          
          {/**----------------------------------------------------------- *//*}
      </div>
        
    </div>
  )
}

export default dashboardHome

*/


import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import BaseURL from './BaseURL';


function DashboardHome() {
  const [dailyUsage, setDailyUsage] = useState(null);
  const [weeklyUsage, setWeeklyUsage] = useState(null);
  const [yearlyUsage, setYearlyUsage] = useState(null);
  const [dailyUsagePrice, setDailyUsagePrice] = useState(null);
  const [weeklyUsagePrice, setWeeklyUsagePrice] = useState(null);
  const [yearlyUsagePrice, setYearlyUsagePrice] = useState(null);

  useEffect(() => {
    const idClient = secureLocalStorage.getItem('i');
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];

    console.log(idClient)
    console.log(date)

    axios
      .post(`${BaseURL}/api/getUsage.php`, { idClient, date })
      .then((response) => {
        const { daily, dailyPrice, weekly, weeklyPrice, yearly, yearlyPrice} = response.data;

        setDailyUsage(daily);
        setWeeklyUsage(weekly);
        setYearlyUsage(yearly);
        setDailyUsagePrice(dailyPrice);
        setWeeklyUsagePrice(weeklyPrice);
        setYearlyUsagePrice(yearlyPrice);
      })
      .catch((error) => {
        console.error('Error fetching usage data:', error);
      });
  }, []);

  const data = [
    { day: 'Mon', usage: 100 },
    { day: 'Tue', usage: 150 },
    { day: 'Wed', usage: 120 },
    { day: 'Thu', usage: 200 },
    { day: 'Fri', usage: 180 },
    { day: 'Sat', usage: 250 },
    { day: 'Sun', usage: 500 },
  ];

  return (
    <div className='dashboardHome'>
      <div className='welcome'>
          <h3>Hello, {secureLocalStorage.getItem('n')}</h3>
          {/************************************************************* */}
          <div className="dashboardContainer">

{ /*           <div className='dashboardMS'>
              <Card>
                <Card.Body>
                  <Card.Title>Dashboard Title</Card.Title>
                  <Card.Text>Description</Card.Text>
                  <Button variant="primary">Button 1</Button>{' '}
                  <Button variant="secondary">Button 2</Button>
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                    <span>75%</span>
                  </div>
                </Card.Body>
              </Card>
  </div>*/}
            <div className='DashboardDailyUsage'>
              <h2>Usage:</h2>

              <div className="usage-cards-wrapper">
                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>Daily</Card.Title>
                    <Card.Text>you saved today : {dailyUsagePrice !== null ? dailyUsagePrice : 0}$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h2>{dailyUsage !== null ? dailyUsage : 0}</h2>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>weekly Usage</Card.Title>
                    <Card.Text>you saved this week :  {weeklyUsagePrice !== null ? weeklyUsagePrice : 0}$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h2>{weeklyUsage !== null ? weeklyUsage : 0}</h2>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="usage-card">
                  <Card.Body>
                    <Card.Title>Yearly Usage</Card.Title>
                    <Card.Text>you saved this year :  {yearlyUsagePrice !== null ? yearlyUsagePrice : 0}$</Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <h2>{yearlyUsage !== null ? yearlyUsage : 0}</h2>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className='dashboardWeeklyChart'>
              <h2>Usage Chart:</h2>
              <div className="chart-container">
                <LineChart width={window.innerWidth - 380} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                </LineChart>
              </div> 
            </div> 
          </div>
          
          {/**----------------------------------------------------------- */}
      </div>
        
    </div>
  )
}

export default DashboardHome