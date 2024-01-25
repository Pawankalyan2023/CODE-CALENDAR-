import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import fro from "../images/Untitled design.png"
import './login.css'
export const Login = () => {
  return (
    <div className="login-container">
      <img src={fro} alt="Login Background" className="background-image" />
      <div className="signin-container">
        <SignInButton />
      </div>
    </div>
  )
}
