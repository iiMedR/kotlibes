import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import NavDashboard from '../components/NavDashboard';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import BaseURL from '../components/BaseURL';
//import Sidebar from '../components/SideBar/Sidebar'
//import DashboardHome from '../components/dashboardHome';  hadi zwltha hitach code dyalha anzlo hna direct
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//import DropdownPrfl from '../components/DropdownPrfl';

function Dashboard() {
  //hadi bach katchof wach deja user 3aml login wla lae bach may9drch ydkhol n dashboard b link
  const[auth , setAuth]= useState('');
  const history = useNavigate();
  useEffect(()=>{
    var auth = secureLocalStorage.getItem('au')
    //console.log(auth)
    setAuth(auth)
  },[])
  if (auth !== "True"){
    history(`/login`)
  }


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

  /*const data = [
    { day: 'Mon', usage: 100 },
    { day: 'Tue', usage: 150 },
    { day: 'Wed', usage: 120 },
    { day: 'Thu', usage: 200 },
    { day: 'Fri', usage: 180 },
    { day: 'Sat', usage: 250 },
    { day: 'Sun', usage: 500 },
  ];*/




  return (
    <>
    
      <div className='dashboardHome'>

      <div className='welcome'>
        <div className='nam'>
          <NavDashboard/>
        </div>
          {/************************************************************* */}
          <div className="dashboardContainer">
            <div className='DashboardUsage'>
              <h2 className='dashboard-title'>Usage 🚀</h2>

              <div className="usage-cards-wrapper">
                <Card className="usage-card" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', border: 'none' }}>
                  <Card.Body>
                    <div style={{ textAlign: 'left', color: '#1E65FA' }}>
                      <h2>{dailyUsage !== null ? dailyUsage : 0} Kots</h2>
                    </div>
                    <Card.Title style={{fontWeight: '100', color: '#6c6c6c', fontSize: '16px'}}>Used Today</Card.Title>
                    <br/>
                    <Card.Text style={{textAlign: 'center' , fontWeight: '500', fontSize: '19px'}}>You Saved Today : {dailyUsagePrice !== null ? dailyUsagePrice : 0}$</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="usage-card" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', border: 'none' }}>
                  <Card.Body>
                    <div  style={{ textAlign: 'left', color: '#1E65FA' }}>
                      <h2>{weeklyUsage !== null ? weeklyUsage : 0} Kots</h2>
                    </div>
                    <Card.Title style={{fontWeight: '100', color: '#6c6c6c', fontSize: '16px'}}>Used This Week</Card.Title>
                    <br/>
                    <Card.Text style={{textAlign: 'center' , fontWeight: '500', fontSize: '19px'}}>you saved this week :  {weeklyUsagePrice !== null ? weeklyUsagePrice : 0}$</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="usage-card" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', border: 'none' }}>
                  <Card.Body>
                    <div  style={{ textAlign: 'left', color: '#1E65FA' }}>
                      <h2>{yearlyUsage !== null ? yearlyUsage : 0} Kots</h2>
                    </div>
                    <Card.Title style={{fontWeight: '100', color: '#6c6c6c', fontSize: '16px'}}>Used This Year</Card.Title>
                    <br/>
                    <Card.Text style={{textAlign: 'center' , fontWeight: '500', fontSize: '19px'}}>you saved this year :  {yearlyUsagePrice !== null ? yearlyUsagePrice : 0}$</Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <h2 className='dashboard-title'>Seasonal Roadmap  📝</h2>
              <Card className="roadmap">
                <button className="roadmap-button">
                <Card.Body>
                  <Card.Title style={{ fontWeight: '500', fontSize: '19px'}}>COMING SOON</Card.Title>
                  <Card.Text>AI-powered seasonal marketing roadmap generator for maximizing sales: Christmas, Ramadan, Black Friday & more.</Card.Text>
                  <div style={{ textAlign: 'center', fontWeight: '500', fontSize: '19px' }}>
                    <h2>Profitable Seasonal Roadmap</h2>
                  </div>
                </Card.Body>
                </button>
              </Card>

              
            </div>
            {/*
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
           */} 
          </div>
          {/**----------------------------------------------------------- */}
      </div>
    </div>
    </>
  )
}

export default Dashboard