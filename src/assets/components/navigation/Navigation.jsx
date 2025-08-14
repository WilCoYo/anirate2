import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import './Navigation.css'

import profileIcon from '../../images/profile-icon.svg'
import dropdownArrow from '../../images/drop-down.svg'

function Navigation() {

    const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    } = useAuth0();

    const navigate = useNavigate();

    const [ showLoginBox, setShowLoginBox] = useState(false);
    


    const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });


    const handleLoginClick = () => {
        if(showLoginBox === false) {
            setShowLoginBox(true);
        }
        else {
            setShowLoginBox(false);
        }
    }


    // if(navIcons.style.display === 'none') {
    //         navIcons.style.display = 'inline-flex'
    //     }
    //     else {
    //         navIcons.style.display = 'none';
    //     }




    useEffect(() => {
    if (isAuthenticated) {
        navigate('/home')
    }
    }, [isAuthenticated, navigate]) // If authenticated navigate to Homepage


   

    if (isLoading) return "Loading...";



    const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } }); // May need changed


  return (
    <div className='nav-bar'>
        <div className='anirate'>
            <h1
                onClick={(e) => {
                e.preventDefault();
                navigate('/home');
            }}
            >Anime<strong className='text-focus-in'>Pulse</strong>
          </h1>
        </div>

        

        <div className='navbar-right'>
            <div className='nav-btns'> 

            <ul>
                <li>Home</li>
                <li>Browse All Anime</li>
                <li>Watchlist</li>
            </ul>    
            </div>

            <div 
                className='nav-icons'
                onClick={handleLoginClick}
                >
                <img src={profileIcon} alt='profile icon' className='profile-icon'/>
                <img src={dropdownArrow} alt='dropdown arrow' className='dropdown-arrow' />
            </div>
            
            {showLoginBox === true ? (
                    !user ? (
                    <div className='login-btns'>

                        <button 
                            onClick={login}
                            className='login-btn'
                        >
                        Login
                        </button>

                        <button 
                            onClick={signup}
                            className='login-btn'
                        >
                        Signup
                        </button>

                    </div>
                    ) : (
                    <div className='login-btns'>

                        <button 
                            onClick={logout}
                            className='login-btn'
                        >
                        Logout
                        </button>
        
                    </div>
                    )
 
                
            ) : (
                <div></div>
            )
            
            }

            
          
            
        </div>
        
    </div>
  )
}

export default Navigation