import React from 'react'

import './Titlecards.css'
import addIcon from '../../images/add-icon.svg'
import infoIcon from '../../images/info-icon.svg'

function Titlecards({anime}) {


  return (
    
      <div className='titlecards'>
        <div className='titlecards-list'>

          <div className='titlecard'>

                                                        {/* took off date and time for now - add later if wanted */}

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

              <div className='titlecard-icons'>

                <img src={addIcon} alt='Add Icon' />
                <img src={infoIcon} alt='Information Icon' />

              </div>

            
            
            
            
          </div>

         </div>
      </div>

    
  )
}

export default Titlecards