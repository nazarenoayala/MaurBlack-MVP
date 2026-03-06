import React from 'react'
import './about.css';

const About = () => {
  return (
  <main className='about-page'>
    <section className='about-container'>
      <div className='about-img'>
        {/* <img src="" alt="Maur Black - Tattoo Artist Barcelona" RETRATO DE MAU?/> */}
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
    </section>
  </main>
  )
}

export default About