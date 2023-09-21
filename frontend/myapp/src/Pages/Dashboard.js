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

  return (
    <>
      <div className='dashboardHome'>
        <div className='welcome'>
          <NavDashboard/>
          <div className="dashboardContainer">
            <div className="DashboardUsage">
              <h2 className="dashboard-title">Usage 🚀</h2>
              <div className="usage-cards-wrapper">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
