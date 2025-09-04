import React from 'react'


import './Home.css'
import SeasonalAnime from '../../components/seasonalAnime/SeasonalAnime'
import AnimeNews from '../../components/animeNews/AnimeNews'
import WeeklyWatchlist from '../../components/weeklyWatchlist/WeeklyWatchlist'

function Home() {




  return (
    <div className='home-page'>

    <div className='background-image'>
    </div>
    <div className='home-section'>
    <div></div>
    <div></div>
    
      <></>
      <div className='weekly-watchlist-section'>
        <WeeklyWatchlist />
      </div>
      <div className='anime-news-section'>
        <AnimeNews />
      </div>
      
      
     
      <SeasonalAnime />
    
    
    
    </div>


      
          
          
      
       
 
    </div>
  )
}

export default Home