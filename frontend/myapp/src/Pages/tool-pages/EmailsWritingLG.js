import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import EmailLeads from '../../components/EmailsWriting_leadGeneration/EmailLeads';

function EmailsWritingLG() {
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
    <EmailLeads />
  )
}

export default EmailsWritingLG