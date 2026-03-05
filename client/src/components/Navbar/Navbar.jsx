import { useState } from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './navbar.css';

const Navbar = () => {
  const location = useLocation(); //obtencion de ruta actual
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className='navbar'>
        <div className='navbar-container'>
          {/* muestra home solo cuando no esta en la raiz "/" */}
          {location.pathname !== "/" && (
            <NavLink to="/" className="nav-link home-link" onClick={closeMenu}>Home</NavLink>
          )}

          <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
          >
              <span />
              <span />
              <span />
          </button>
        <ul className={`navbar-links ${menuOpen ? 'menu-open' : ''}`}>
                    <NavLink to="/work" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Work</NavLink>
                    <NavLink to="/shop" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Shop</NavLink>
                    <NavLink to="/events" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Events</NavLink>
                    <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>About</NavLink>
                      <a
                      href="https://www.instagram.com/maurblack"
                      target="_blank"
                      rel="noreferrer"
                      className="nav-instagram"
                      onClick={closeMenu}
                      >
                    <FontAwesomeIcon icon={faInstagram} fontSize={32} />
                    </a>
                    <NavLink to="/book" className="btn-book" onClick={closeMenu}>BOOK</NavLink>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar;