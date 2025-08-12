import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css'


function Home() {

    const { logout: auth0Logout } = useAuth0();

     const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } }); // May need changed


  return (
    <div className='home-page'>

    <div className='background-image'>

    </div>
        <div className='home-box'>
            <button onClick={logout}>Logout</button>
        </div>
            
     

        

    </div>
  )
}

export default Home