import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './Login.css';
import { useNavigate } from 'react-router';

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

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } }); // May need changed



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



        <button onClick={login}>Login</button>

        <button onClick={signup}>Signup</button>
        
      </div>
    </div>
  );
}

export default Login