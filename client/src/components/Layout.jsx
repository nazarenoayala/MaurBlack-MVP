import {Outlet} from 'react-router-dom';
import Navbar from './Navbar/Navbar'

const Layout = () => {
  return (
    <div className='main-layout'>
        <Navbar/>
        <div className='content'>
            <Outlet/>
        </div>
        {/* añadir footer luego */}
    </div>
  )
}

export default Layout;