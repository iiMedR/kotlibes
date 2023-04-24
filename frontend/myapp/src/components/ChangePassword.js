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
  

    return null;
}

export default ChangePassword;
