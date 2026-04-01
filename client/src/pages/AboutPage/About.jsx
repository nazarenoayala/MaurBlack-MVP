import React from 'react'
import './about.css';

const About = () => {
  return (
  <main className='about-page'>
    <section className='about-container'>
      <div className='about-img'>
        <img 
          src="/assets/maurblackprofile.jpeg" 
          alt="Maur Black - Tattoo Artist Barcelona" 
          className="profile-photo"
        />
      </div>
      <div className='about-info'>
        <h1 className='about-name'>MAURBLACK</h1>
        <div className='divider'></div>
        <p className='about-text'>
          "I’m a multidisciplinary artist born and raised in Buenos Aires. 
          Since I started tattooing, I’ve been fascinated by Japanese and Tibetan art, 
          blending them with ornamental and traditional styles.
          As a history and photography enthusiast, I document and collect the experiences shaped by this craft. 
          After several years traveling between London and Argentina, I’m now based in Barcelona, 
          where you can find me at the shop: 
          <a href="https://www.redtempletattoo.com" target="_blank" rel="noopener noreferrer" className="shop-link">
          Red Temple Tattoo
        </a>."
        </p>
      </div>
    </section>
  </main>
  )
}

export default About