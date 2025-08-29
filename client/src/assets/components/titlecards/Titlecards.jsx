import React from 'react'

import './Titlecards.css'

function Titlecards({anime}) {


  return (
    
      <div className='titlecards'>
        <div className='titlecards-list'>

          <div className='titlecard'>

            {/* {anime?.broadcast.day === 'unknown' ? (
              <div className='titlecards-date-time'>
                <h4>Broadcast Info Unknown</h4>
              </div>
            ) : (
              <div className='titlecards-date-time'>
                <h4>{anime?.broadcast.day}</h4>
              </div>
            )
            } */}

              <div className='titlecard-img'>
                
                  <img 
                    src={anime?.images?.jpg.image_url}
                    alt='anime cover art'
                    
                  />
                  <div 
                    className='titlecard-title' 
                  >
                    <h4>{ anime?.title_english || anime?.title}</h4>
                  </div>

              </div>

          

            
            
            
            
          </div>

         </div>
      </div>

    
  )
}

export default Titlecards