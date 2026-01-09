import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Titlecards.css'
import addIcon from '../../images/add-icon.svg'
import infoIcon from '../../images/info-icon.svg'


function Titlecards({anime, parentComponent}) {
const navigate = useNavigate();

  return (
    
      <div className={`titlecards ${parentComponent}`}>
        <div className={`titlecards-list ${parentComponent}`}>

          <div className={`titlecard ${parentComponent}`}>

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

              <div className='titlecard-btns'>

                <button className='titlecard-btn-lft btn'
                >
                      <img src={addIcon} alt='Add Icon' />
                </button>

                <button className='titlecard-btn-rt btn'
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/info', {state: { anime }}); //pass anime to Info page
                        }}
                >
                        <img src={infoIcon} alt='Information Icon' />
                </button>                                          

                
                

              </div>

            
            
            
            
          </div>

         </div>
      </div>

    
  )
}

export default Titlecards