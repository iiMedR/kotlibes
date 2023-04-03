  import React, { useState } from 'react';
  import { TextField, Snackbar } from '@mui/material';
  import Card from 'react-bootstrap/Card';
  import axios from 'axios';
  import secureLocalStorage from 'react-secure-storage';
  import Alert from '@mui/material/Alert';
  import BaseURL from './BaseURL';

  function SettingsHome() {
    const [fullName, setFullName] = useState(secureLocalStorage.getItem('n'));
    const [email, setEmail] = useState(secureLocalStorage.getItem('e'));
    const [phone, setPhone] = useState(secureLocalStorage.getItem('p'));
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleFullNameChange = (event) => {
      setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };

    return (
      <>
        <div className='settingsHome'>
        </div>
      </>
    );
  }

  export default SettingsHome;
