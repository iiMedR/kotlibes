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

    const handleSaveClick = async (e) => {
      e.preventDefault();
      const id = secureLocalStorage.getItem('i');
      try {
        const response = await axios.post(`${BaseURL}/api/update.php`, {
          Id: id,
          FullName: fullName,
          Email: email,
          Phone: phone,
        });
        if (response.data.status === 0) {
          console.log(response.data.message);
          setMessage(response.data.message);
          setStatus(response.data.status);
          secureLocalStorage.setItem('n', fullName);
          secureLocalStorage.setItem('e', email);
          secureLocalStorage.setItem('p', phone);
          setTimeout(() => {
            window.location.reload(); // Reload the page
          }, 3000); // Wait for 3 seconds before reloading
        } else {
          console.log(response.data.message);
          setMessage(response.data.message);
          setStatus(response.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    const handleClick = async (e) => {
      e.preventDefault();
      const id = secureLocalStorage.getItem('i');
      try {
        const response = await axios.post(`${BaseURL}/api/updatePassword.php`, {
          Id: id,
          currentPass: currentPassword,
          newPass: newPassword,
          confirmPass: confirmPassword,
        });
        if (response.data.status === 0) {
          console.log(response.data.message);
          setMessage(response.data.message);
          setStatus(response.data.status);
          setTimeout(() => {
            window.location.reload(); // Reload the page
          }, 3000); // Wait for 3 seconds before reloading
        } else {
          console.log(response.data.message);
          setMessage(response.data.message);
          setStatus(response.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <div className='settingsHome'>
          <form onSubmit={handleSaveClick}>
            <Card className='PInfoContainer'>
              <Card.Header className='ttl'>
                <h1>⚙️ Profile Settings</h1>
              </Card.Header>
              <div className='PInfoInputs'>
                <TextField label='Full Name:' className='txt' name='fullName' value={fullName} onChange={handleFullNameChange} required />
              </div>
              <div className='PInfoInputs'>
                <TextField label='Email:' className='txt' name='email' value={email} onChange={handleEmailChange} disabled />
              </div>
              <div className='PInfoInputs'>
                <TextField label='Phone:' className='txt' name='phone' value={phone} onChange={handlePhoneChange} required />
              </div>
              <button className='updateButton'>SAVE</button>
              <Snackbar
                open={status === 0}
                autoHideDuration={2000}
                onClose={() => setStatus('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert severity='success' sx={{ width: '100%', fontSize: '18px' }}>
                  {message}
                </Alert>
              </Snackbar>
              <Snackbar
                open={status === 1}
                autoHideDuration={2000}
                onClose={() => setStatus('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert severity='error'>{message}</Alert>
              </Snackbar>
            </Card>
          </form>

          <form onSubmit={handleClick}>
            <Card className='SInfoContainer'>
              <Card.Header className='ttl'>
                <h1>🔒 Security Settings</h1>
              </Card.Header>
              <div className='SInfoInputs'>
                <TextField label='Current password' className='txt' name='currentPass' type='password' onChange={handleCurrentPasswordChange} required />
              </div>
              <div className='SInfoInputs'>
                <TextField label='New password' className='txt' name='newPass' type='password' onChange={handleNewPasswordChange} required />
              </div>
              <div className='SInfoInputs'>
                <TextField
                  label='Confirm new password'
                  className='txt'
                  name='confirmPass'
                  type='password'
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <button className='updateButton'>CHANGE PASSWORD</button>
            </Card>
          </form>        </div>
      </>
    );
  }

  export default SettingsHome;
