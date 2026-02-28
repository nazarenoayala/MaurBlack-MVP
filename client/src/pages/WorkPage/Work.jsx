import React from 'react'
import { useNavigate } from 'react-router-dom';
import './work.css';

const Work = () => {
  const navigate = useNavigate();

  return (
    <div className='work-page'>
        <div className='work-header'>
          <h2>Select a category to explore the collection</h2>
        </div>

        <div className='work-grid'>
          {/* Tattoos (type 1) */}
          <div
            className='category-card tattoo'
            onClick={() => navigate('/work/gallery/1')}
          >
            <div className='category-cover'>
                <h2>TATTOOS</h2>
                <span className='gallery-btn'>VIEW GALLERY</span>
            </div>
          </div>

          {/* Paints (type 2) */}
          <div
              className='category-card paint'
              onClick={() => navigate('/work/gallery/2')}
          >
              <div className='category-cover'>
                <h2>PAINTS</h2>
                <span className='gallery-btn'>VIEW GALLERY</span>

              </div>
          </div>
        </div>
    </div>
  )
}

export default Work;