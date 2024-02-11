import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from './BaseURL';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import NavBar from './NavBar';

function ResetPassword() {
  const [email, setEmail] = useState({});
  const [error, setError] = useState({});
  const [status, setStatus] = useState(''); // To track the status of the email sending (0 for success, 1 for error)
  const [message, setMessage] = useState(''); // To store the message for the Alert component
  const [lastSentTime, setLastSentTime] = useState(null); // To track the last sent email time
  const [remainingTime, setRemainingTime] = useState(0); // To store the remaining time in seconds

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEmail((values) => ({ ...values, [name]: value }));

    // Check if the input field is empty
    if (value === '') {
      setError((prevErrors) => ({ ...prevErrors, [name]: 'This field is required' }));
    } else {
      setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }

    // Check if the input field has a certain pattern
    if (name === 'email' && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError((prevErrors) => ({ ...prevErrors, [name]: 'Invalid email address' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if there are any errors
    const hasErrors = Object.values(error).some((error) => error !== '');
    if (hasErrors) {
      console.log('Please fix the errors before submitting the form.');
      return;
    }

    // Check if the minimum time limit (1 minute) has passed since the last sent email
    if (lastSentTime && new Date() - lastSentTime < 60000) {
      console.log('Please wait for 1 minute before resending the email.');
      return;
    }

    try {
      const response = await axios.post(`${BaseURL}/api/resetPassword/reset.php`, email);
      if (response.data.status === 0) {
        setStatus(0); // Success status
        setMessage(response.data.message);
        setLastSentTime(new Date()); // Set the current time as the last sent time
        setRemainingTime(60); // Reset the remaining time to 60 seconds
      } else {
        setStatus(1); // Error status
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setStatus(1); // Error status
      setMessage('Something went wrong, please try again later.');
    }
  };

  useEffect(() => {
    // Clear the email input and errors when the component mounts
    setEmail({});
    setError({});
  }, []);

  useEffect(() => {
    let countdownInterval;

    if (lastSentTime && new Date() - lastSentTime < 60000) {
      const remainingSeconds = Math.ceil((lastSentTime.getTime() + 60000 - new Date().getTime()) / 1000);
      setRemainingTime(remainingSeconds);

      countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [lastSentTime]);

  return (
    <>
      <NavBar />
      <div className="resetContainer">
        <form className="resetForm" onSubmit={handleSubmit}>
          <h4>Input Your Email</h4>
          <input type="email" placeholder="Email" name="email" required onChange={handleChange}></input>
          <button disabled={remainingTime > 0}>Send a verification email</button>
          {remainingTime > 0 && (
          <p>
            Please wait {remainingTime} second{remainingTime !== 1 ? 's' : ''} before resending the email.
          </p>
        )}
        </form>
      </div>
      <Snackbar open={status === 0} autoHideDuration={2000} onClose={() => setStatus('')}>
        <Alert severity="success" sx={{ width: '100%', fontSize: '18px' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={status === 1} autoHideDuration={6000} onClose={() => setStatus('')}>
        <Alert severity="error" sx={{ width: '100%', fontSize: '18px' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ResetPassword;
