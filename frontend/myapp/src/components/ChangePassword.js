import React, { useState, useEffect } from 'react';
import axios from "axios";
import BaseURL from './BaseURL';

function ChangePassword() {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [expiration, setExpiration] = useState('');
    const [isExpired, setIsExpired] = useState(false);
  
    const [passwordsMatch, setPasswordsMatch] = useState(false);
  
    const [inputs, setInputs] = useState({
      token: '',
      id: '',
      password: '',
      confirm: '',
    });
  
    const [error, setError] = useState('');
    console.log(error)

    useEffect(() => {

      //had part katjbd parameters mn link
      const urlParams = new URLSearchParams(window.location.search);
      setToken(urlParams.get('code'));
      setId(urlParams.get('id'));
      setExpiration(urlParams.get('exp'));

      //had part katjbd date dyal user o kat3mlo comparison m3a expiring time d token li f db
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const isDate1BeforeDate2 = currentDate > expiration;
      setIsExpired(isDate1BeforeDate2);
      //console.log(isExpired);
      //had part katdkhel token and id at the first time f inputs bach ytsrdo n api m3a password
      setInputs({ ...inputs, token: token, id: id });
    }, [isExpired, expiration, token, id, inputs]);
  

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs({ ...inputs, [name]: value });
        
       //hadi kat compari l password m3a confirmation bach tchof wach bjoj fhal fhal
      if (name === 'password' || name === 'confirm') {
        const otherPassword = name === 'password' ? inputs.confirm : inputs.password;
        setPasswordsMatch(value === otherPassword);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post(`${BaseURL}/api/resetPassword/change.php`, inputs);
        if (response.data.status === 0) {
          setError(response.data.message);
        } else {
          setError('');
          console.log('password changed.');
          window.location.href = '/login';
        }
      } catch (error) {
        console.log(error);
        setError('Something went wrong, please try again later.');
      }
    };
  
  if(isExpired === false){
    return (
      <>
        <div>
          <div className='changeContainer'>
            <form className='changeForm' onSubmit={handleSubmit}>
              <h4>Input Your New Password</h4>
              <input type='password' placeholder='password' name='password' required onChange={handleChange}></input>
              <input type='password' placeholder='confirm password' name='confirm' required onChange={handleChange}></input>
              {!passwordsMatch && <p >Passwords do not match</p>}
              <button disabled={!passwordsMatch}>change password</button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <div className='changeContainerExpired'>
            <form className='changeFormExpired'>
              <div className='h4cnt'>
                  <h4>Link is expired :') </h4>
                  <h4>Try again later</h4>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ChangePassword;
