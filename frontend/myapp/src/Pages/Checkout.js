import React , {useState , useEffect} from 'react';
import secureLocalStorage from 'react-secure-storage';

function Checkout() {

    const [checkout, setCheckout] = useState('bb68a7e5-9aa7-40e8-8805-cc1b13ed5eac')
    const [email, setEmail] = useState('example@email.com')

    useEffect(() => {
        setEmail(secureLocalStorage.getItem('e'))
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('co')!=='null'){
            setCheckout(urlParams.get('co')) 
        };
    }, []);

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

  return (<div />);
}

export default Checkout;
