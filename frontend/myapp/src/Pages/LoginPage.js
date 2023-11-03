import React from 'react'
import SigninLogin from '../components/Signin'
import NavBar from '../components/NavBar'
//
const LoginPage = () => {
  return (
    <>
    <NavBar darkBg={false}/>
    <SigninLogin />
    </>
  )
}

export default LoginPage