import React, { useState, useEffect } from 'react'
import * as Components from './Components';

const Signin = () => {
    const [signIn, toggle] = React.useState(true);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState('');
const handleChange = (event) => {
          const name = event.target.name;
          const value = event.target.value;
          setInputs(values => ({...values, [name]: value}));

            // Check if the input field is empty
        if(value === ""){
            setErrors(prevErrors => ({...prevErrors, [name]: "This field is required"}))
        } else {
            setErrors(prevErrors => ({...prevErrors, [name]: ""}))
        }
    
        // Check if the input field has a certain pattern
        if(name === "email" && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            setErrors(prevErrors => ({...prevErrors, [name]: "Invalid email address"}))
        }

        // Check if the password input field hasn't a certain pattern
        //if(name === "password" && !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#.$+%^&*])[a-zA-Z!@#+.$%^&*]{8,}$/)){
            //  setErrors(prevErrors => ({...prevErrors, [name]: "at least 8 letters"}))
        //}


      }

  return (
    <Components.Container className='signInUp'>
             <Components.SignUpContainer className='SignUpContainer' signinIn={signIn}>
                 <Components.Form className='sign-Form signup-Form'>
                     <Components.Title className='sign-Title'>Create Account</Components.Title>
                     <Components.Input className='sign-Input' type='text' name="name" placeholder='Name' onChange={handleChange} required/>
                     <Components.Input className='sign-Input' type='email' name="email" placeholder='Email' onChange={handleChange} required/>
                     <Components.Input className='sign-Input' type='password' name="password" placeholder='Password' onChange={handleChange} required/>
                     <Components.Button className='sign-Button'>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer className='SignInContainer' signinIn={signIn}>
                 <Components.Title className='sign-Title'>Sign in</Components.Title>
             </Components.SignInContainer>

             <Components.OverlayContainer className='OverlayContainer' signinIn={signIn}>
                 <Components.Overlay className='sign-Overlay' signinIn={signIn}>

                 <Components.LeftOverlayPanel className='LeftOverlayPanel' signinIn={signIn}>
                     <Components.Title className='sign-Title'>Welcome Back!</Components.Title>
                     <Components.Paragraph className='sign-Paragraph'>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton className='sign-GhostButton' onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel className='RightOverlayPanel' signinIn={signIn}>
                        <Components.Title className='sign-Title'>Hello, Friend!</Components.Title>
                        <Components.Paragraph className='sign-Paragraph'>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton className='sign-GhostButton' onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
  )
}

export default Signin
