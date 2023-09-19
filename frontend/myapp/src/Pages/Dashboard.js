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
