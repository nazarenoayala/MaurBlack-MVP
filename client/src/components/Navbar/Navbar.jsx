import {NavLink, useLocation} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation(); //obtencion de ruta actual
  return (
    <nav className='navbar'>
        <div className='navbar-container'>
          {/* muestra home solo cuando no esta en la raiz "/" */}
          {location.pathname !== "/" && (
            <NavLink to="/" className="nav-link home-link">HOME</NavLink>
          )}
        <ul className='navbar-links'>
                    <NavLink to="/work" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Work</NavLink>
                    <NavLink to="/events" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Events</NavLink>
                    <NavLink to="/shop" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink>
                    <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
                    <NavLink to="/book" className="btn-book">BOOK</NavLink>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar