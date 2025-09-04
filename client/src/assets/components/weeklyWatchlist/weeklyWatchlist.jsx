import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import './weeklyWatchlist.css'
import { fetchSeasonalAnime } from '../../../api/jikanApi'
import { useAuth0 } from "@auth0/auth0-react";

import convertJSTtoUserDay from '../../utilities/convertToJST';
import Titlecards from '../titlecards/Titlecards';



function weeklyWatchlist() {

const [watchlist, setWatchlist] = useState([]);
const [currentWeekday, setCurrentWeekday] = useState('');
const [seasonalAnimeList, setSeasonalAnimeList] = useState([]);
const [loading, setLoading] = useState(true) ; 
const cardsRef = useRef(null);
const user = useAuth0();


// Setting Seasonal Anime List
useEffect(() => {

    const loadSeasonalAnime = async () => {
        try{
            const data = await fetchSeasonalAnime();
            setSeasonalAnimeList(data);
        } catch (error) {
            console.error('Failed to fetch seasonal anime for weekly watchlist component', error)
        }

        }
    loadSeasonalAnime();
    
}, [])


                            // Test to see if Seasonal Anime List is getting data
                            useEffect(() => {
                                console.log('Seasonal Anime List', seasonalAnimeList)
                            }, [seasonalAnimeList])


// Mapping and normalizing weekdays
// useEffect(() => {
//         const dayMapping = {
//         'Sunday': 'sundays',
//         'Monday': 'mondays',
//         'Tuesday': 'tuesdays',
//         'Wednesday': 'wednesdays',
//         'Thursday': 'thursdays',
//         'Friday': 'fridays',
//         'Saturday': 'saturdays',
//     };

// const date = new Date();
// const weekday = date.toLocaleString('en-US', { weekday: 'long' });
// const normalizedWeekday = dayMapping[weekday] || weekday.toLowerCase() + 's';
// setCurrentWeekday(normalizedWeekday);
// console.log('Current Weekday', normalizedWeekday)


// })



// const [mondays, setMondays] = useState([]);
// const [tuesdays, setTuesdays] = useState([]);
// const [wednesdays, setWednesdays] = useState([]);
// const [thursdays, setThursdays] = useState([]);
// const [fridays, setFridays] = useState([]);
// const [saturdays, setSaturdays] = useState([]);
// const [sundays, setSundays] = useState([]);


const [animeByDay, setAnimeByDay] = useState({});



const getAnimeWeekday = broadcastInfo => {

    if(!broadcastInfo) return null;
    const { userWeekday } = convertJSTtoUserDay(broadcastInfo);
    return userWeekday?.toLowerCase() || null;
};


useEffect(() => {
  if (seasonalAnimeList.length > 0) {

    const grouped = seasonalAnimeList.reduce((acc, anime) => {
      const day = getAnimeWeekday(anime?.broadcast);
                                console.log(anime.title, anime?.broadcast?.day, "→", day);
      if (day) {
        if (!acc[day]) acc[day] = [];
        acc[day].push(anime);
      }
      return acc;
    
    }, {});

    setAnimeByDay(grouped);
  }
  
}, [seasonalAnimeList]);

useEffect(() => {
  console.log("Anime by day updated:", animeByDay);
}, [animeByDay]);


const weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
];

const [activeDay, setActiveDay] = useState('monday');

// To make it so titlecards scroll left and right 

  const listRefs = useRef({});


    const handleWheel = (event, day) => {
        const el = listRefs.current[day];
        if(!el) return;

        const canScroll = el.scrollWidth > el.clientWidth;

        if(canScroll) {
            event.preventDefault();
            event.stopPropagation();
            el.scrollLeft += event.deltaY;
        }
    };



  useEffect(() => {
     const el = listRefs.current[activeDay];
     if(!el) return;

     const wheelHandler = (e) => handleWheel(e, activeDay);
     el.addEventListener("wheel", wheelHandler, { passive: false });

     return () => {
        el.removeEventListener("wheel", wheelHandler);
     };



  }, [activeDay])

const toggleWeekday = (day) => {
    setActiveDay(prev => prev === day ? null : day)
}




  return (
    <div className='weekly-watchlist-section' >
        <div className='watchlist-dropdown' >
            

        
            <div className='watchlist-title'>
                <h3>
                    Weekly<strong className="pulse"> Watchlist</strong>
                </h3>
            </div>

            {weekdays.map((day) => (
                <div key={day} className='weekday'>

                    <h4 onClick={() => toggleWeekday(day)}>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                    
                    {activeDay === day && (
                        <div
                            className='weekday-anime-list'
                            ref={(el) => (listRefs.current[day] = el)}
                        >
                            {animeByDay[day]?.length > 0 ? (
                                animeByDay[day].map(
                                    (anime) => 
                                        anime?.mal_id && (
                                            <Titlecards key={anime.mal_id} anime={anime} />
                                        )
                                )
                            ) : (
                                <div>No anime this day</div>
                            )}
                        </div>
                    )}
                    
                </div> 
            ))}
            
                    
                 

            
            
        </div>
        
    </div>
  )
}

export default weeklyWatchlist