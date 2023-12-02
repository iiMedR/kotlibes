import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
//import Sidebar from '../components/SideBar/Sidebar'
import ToolHome from '../components/toolHome'
import NavDashboard from '../components/NavDashboard';

function Tools() {
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
    <NavDashboard/>
    <ToolHome />
  </>
  )
}

export default Tools