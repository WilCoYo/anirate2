import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import './Navigation.css'

import profileIcon from '../../images/profile-icon.svg'
import dropdownArrow from '../../images/drop-down.svg'
import hamburgerMenu from '../../images/hamburger-menu.svg'

function Navigation() {

 
    const {
    isLoading, 
    isAuthenticated,
    error,
    loginWithRedirect,
    getAccessTokenSilently,
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    } = useAuth0();
    
    const navigate = useNavigate();

    const [ showLoginBox, setShowLoginBox] = useState(false);

    const handleLoginClick = () => {
        if(showLoginBox === false) {
            setShowLoginBox(true);
        }
        else {
            setShowLoginBox(false);
        }
    }

    

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email'
            }
        });
    };

    const signup = async () => {
        await loginWithRedirect({
            screen_hint: 'signup',
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email'
            }
        })
    }

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } }); // May need changed



    useEffect(() => {
        const createUserInMongo = async () => {
            if(isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently({
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                        scope: 'openid profile email',
                    });

                    const res = await fetch('/api/text-user', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();
                    console.log('MongoDB user created/found:', data.user);
                } catch (err) {
                    console.error('Error ensuring user in MongoDB', err)
                }
            }
        };

        createUserInMongo();
    }, [isAuthenticated, getAccessTokenSilently])


    useEffect(() => {
    if (isAuthenticated) {
        navigate('/')
    }
    }, [isAuthenticated, navigate]) // If authenticated navigate to Homepage


   

    if (isLoading) return "Loading...";






    


  return (
    <div className='nav-bar'>
        <div className='anirate'>
            <h1
                onClick={(e) => {
                e.preventDefault();
                navigate('/');
            }}
            >Anime<strong className='text-focus-in'>Pulse</strong>
          </h1>
        </div>

        

        <div className='navbar-right'>
            <div className='nav-btns desktop'> 

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
                <img src={hamburgerMenu} alt='Hamburger Menu Icon' className='menu-icon mobile' />
                <img src={profileIcon} alt='profile icon' className='profile-icon desktop'/>
                <img src={dropdownArrow} alt='dropdown arrow' className='dropdown-arrow desktop' />
            </div>
            
            {showLoginBox === true ? (
                    !user ? (
                    <div className='login-btns'>

                        <div className='nav-btns mobile'> 

                            <ul>
                                <li>Home</li>
                                <li>Browse All Anime</li>
                                <li>Watchlist</li>
                            </ul>   

                        </div>
                        
                        <button 
                            onClick={loginWithRedirect}
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

                        <div className='nav-btns mobile'> 

                            <ul>
                                <li>Home</li>
                                <li>Browse</li>
                                <li>Watchlist</li>
                            </ul>   

                        </div>
                        <span>Hello, { user?.nickname || user?.email }</span>
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