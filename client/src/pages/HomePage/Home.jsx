import { useEffect, useState } from 'react';
import api from '../../services/api';
import './home.css';

const Home = () => {
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
    <main className="home-hero">
      <div className="hero-content">
        <span className="hero-subtitle">ORNAMENTHAL & BLACKWORK</span>
        <h1 className="hero-title">MAUR BLACK</h1>
        <div className="hero-divider"></div>
        <p className="hero-description">
          Ornamental
        </p>
        <button className="hero-cta">EXPLORAR GALERÍA</button>
      </div>
      
      {/* overlay sutil para dar textura al fondo o foto degradada*/}
      <div className="hero-overlay"></div>
    </main>
  )
};

export default Home;