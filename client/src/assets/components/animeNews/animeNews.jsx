import React, { useEffect, useState } from 'react'
import './animeNews.css'

import { fetchAnimeNews } from '../../../api/jikanApi'

function animeNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await fetchAnimeNews();
                setNews(data);
            } catch(error) {
                console.error('Failed to fetch anime news', error)
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, [] )


if(loading) return <p>Loading Anime News...</p>

  return (
    <div className='animenews-section'>
        <h3>Anime News</h3>
        <div className='animenews-list'>
            {loading ? (
                <p>Loading Seasonal Anime...</p>
            ) : (
                news.map(
                    (anime) =>
                        <div className='animenews' key={anime.mal_id} >
                            <a href={anime.url} target="_blank">
                        
                                
                                <img 
                                    src={anime?.images?.jpg.image_url}
                                />
                                <h4>{anime?.title}</h4>
                            </a>
                        </div>
                        
                    
                )
            )}
        </div>
    </div>
  )
}

export default animeNews