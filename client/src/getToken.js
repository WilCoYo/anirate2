import React from 'react'


import './Home.css'


function Home() {

async function getToken() {
  try {
      const response = await fetch('https://dev-jkly4ia4zrmtofzn.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          "client_id":"j1kuPZbzqG39OyR4SS2njWF4djStNUhr",
          "client_secret":"dev-jkly4ia4zrmtofzn.us.auth0.com",
          "audience":"https://dev-jkly4ia4zrmtofzn.us.auth0.com/api/v2/",
          "grant_type":"client_credentials"
        }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error fetching token:', error);
  }
};


  return (
    <div className='home-page'>

    <div className='background-image'>
    </div>

      <div className='home-box'>
          {getToken()}
          
      </div>
       
 
    </div>
  )
}

export default Home