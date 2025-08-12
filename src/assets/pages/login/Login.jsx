import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './Login.css';
import { useNavigate } from 'react-router';

import Gojo from '../../images/gojo-cat-logo.png'
import Dandadan1080 from '../../images/dandadan-bg-1080.png'
import Dandadan1440 from '../../images/dandadan-bg-1440.png'

function Login() {
   const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  const navigate = useNavigate();

  


  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

 



  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate]) // If authenticated navigate to Homepage


  if (isAuthenticated) return null // If authenticated, return null because useEffect is handling redierect


  if (isLoading) return "Loading...";

  return (
    <div className='login-page'>

      

      <div className='login-box'>
        {error && <p>Error: {error.message}</p>}

        <div className='login-hero-text'>
          <h1
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          >Anime<strong className='text-focus-in'>Pulse</strong>
          </h1>

          <p>View, rate, and share your favorite anime with friends</p>
        </div>


        <div className='anirate-logo'>
          <img className='gojo-cat'src={Gojo} alt='Gojo cat' />
        </div>

        <div className='login-text'>

        </div>

        <div className='login-page-btns'>

          <button 
            onClick={login}
            className='login-page-btn'
          >
          Login
          </button>

          <button 
            onClick={signup}
            className='login-page-btn'
          >
          Signup
          </button>
        </div>
          
      </div>

    </div>
  );
}

export default Login