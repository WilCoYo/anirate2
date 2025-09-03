import React, {useState, useEffect, useRef} from 'react'
import './weeklyWatchlist.css'
import { fetchAnimeNews, fetchSeasonalAnime } from '../../../api/jikanApi'
import { useAuth0 } from "@auth0/auth0-react";

function weeklyWatchlist() {


const [currentWeekday, setCurrentWeekday] = useState('');
const [seasonalAnimeList, setSeasonalAnimeList] = useState([]);
const [loading, setLoading] = useState(true) ; 
const cardsRef = useRef(null);
const user = useAuth0();


useEffect(() =>{
        const dayMapping = {
        'Sunday': 'sundays',
        'Monday': 'mondays',
        'Tuesday': 'tuesdays',
        'Wednesday': 'wednesdays',
        'Thursday': 'thursdays',
        'Friday': 'fridays',
        'Saturday': 'saturdays',
    };

const date = new Date();
const weekday = date.toLocaleString('en-US', { weekday: 'long' });
const normalizedWeekday = dayMapping[weekday] || weekday.toLowerCase() + 's';
setCurrentWeekday(normalizedWeekday);
console.log('Current Weekday', normalizedWeekday)


})


useEffect(() => {

    const loadSeasonalAnime = async () => {
        try{
            const data = await fetchSeasonalAnime();
            setSeasonalAnimeList();
        } catch (error) {
            console.error('Failed to fetch seasonal anime for weekly watchlist component', error)
        }

        }
    loadSeasonalAnime();



    



        
}, [])


if(!user) {

}






  return (
    <div className='weekly-watchlist-section'>
        <div className='watchlist-dropdown'>
            <div className='watchlist-title'><h3>Weekly<strong className="pulse"> Watchlist</strong></h3></div>
            <div id='mondays' className='weekday'><h3>Monday</h3></div>
            <div id='tuesdays' className='weekday'><h3>Tuesday</h3></div>
            <div id='wednesdays' className='weekday'><h3>Wednesday</h3></div>
            <div id='thursdays' className='weekday'><h3>Thursday</h3></div>
            <div id='fridays' className='weekday'><h3>Friday</h3></div>
            <div id='saturdays' className='weekday'><h3>Saturday</h3></div>
            <div id='sundays' className='weekday'><h3>Sunday</h3></div>
            
        </div>
        
    </div>
  )
}

export default weeklyWatchlist