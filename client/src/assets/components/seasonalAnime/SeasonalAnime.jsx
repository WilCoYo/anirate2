import React, {useRef, useState, useEffect, useLayoutEffect } from 'react'


import './SeasonalAnime.css'
import { fetchSeasonalAnime } from '../../../api/jikanApi'
import Titlecards from '../titlecards/Titlecards';



function SeasonalAnime() {


const [seasonalAnimeList, setSeasonalAnimeList] = useState([]);
const [loading, setLoading] = useState(true) ; 
const cardsRef = useRef(null);


// Need to take the fetchSeasonalAnime function pull it into an array to access data
useEffect(() => {
 
  const loadSeasonalAnime = async () => {
    try {
      const data = await fetchSeasonalAnime();
      setSeasonalAnimeList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };
  loadSeasonalAnime();
 
}, [])



// To make it so titlecards scroll left and right 
useLayoutEffect(() => {
  const ref = cardsRef.current;
                                      // console.log('Ref assigned:', ref); 

  const handleWheel = (event) => {
    if (ref) {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    }
  };

  if (ref) {
    ref.addEventListener('wheel', handleWheel, { passive: false });
  }

  return () => {
    if (ref) ref.removeEventListener('wheel', handleWheel);
  };
}, []);





  return (
    <div className='seasonal-section'>
      <h3>Summer Anime</h3>
      <div className='seasonal-list' ref={cardsRef}>
         {loading ? (
          <p>Loading Seasonal Anime...</p>
          ) : (
            seasonalAnimeList.map(
              (anime) =>
                anime?.mal_id && <Titlecards key={anime.mal_id} anime={anime} />
            )
          )}
          
      </div>

    </div>
  )
}

export default SeasonalAnime