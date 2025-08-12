import React from 'react'
import './Navigation.css'

function Navigation() {
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
    </div>
  )
}

export default Navigation