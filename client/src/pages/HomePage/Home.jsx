import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get('/works');
        setWorks(res.data);
      } catch (error) {
        console.error("Error trayendo trabajos:", error);
      }
    };
    fetchWorks();
  }, []);

  return (
    <main className="home-maur">
      <div className='video-content'>
        <video autoPlay
               muted 
               loop
               playsInline
               className='bg-video'
        >
          <source src='https://res.cloudinary.com/ddzvaugox/video/upload/v1772261040/MAURO-Y-JORGE_poyb8c.mp4' type='video/mp4'/>
        </video>
        <div className='video-cover'></div>
      </div>
      <div className="home-content">
        <span className="home-subtitle">TATTOO & PAINT ARTIST</span>
        <h1 className="home-title">MAURBLACK</h1>
        <div className="home-divider"></div>
        <button 
          className="home-cta"
          onClick={() => navigate('/work')}
          >EXPLORE GALLERY
          </button>
      </div>
      
      {/* overlay sutil para dar textura al fondo o foto degradada*/}
      <div className="home-cover"></div>
    </main>
  )
};

export default Home;