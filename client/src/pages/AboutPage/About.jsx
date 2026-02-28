import React from 'react'
import './about.css';

const About = () => {
  return (
  <main className='about-page'>
    <div className='about-container'>
      <div className='about-img'>
        {/* <img src="" alt="" RETRATO DE MAU?/> */}
      </div>
      <div className='about-info'>
        <h1 className='about-name'>MAURBLACK</h1>
        <div className='divider'></div>
        <p className='about-text'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Odit itaque accusantium possimus illum libero totam inventore 
          facilis explicabo eaque animi est sequi aspernatur error,
           ipsum impedit. Eos doloribus maiores quae.
        </p>
      </div>
    </div>
  </main>
  )
}

export default About