import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/Layout';


//Carga perezosa
const Home = lazy(() => import('../pages/HomePage/Home'));
const Work = lazy(() => import('../pages/WorkPage/Work'));
const WorkGallery = lazy(() => import('../pages/WorkGallery/WorkGallery'))
const About = lazy(() => import('../pages/AboutPage/About'));
const SelectionBooking = lazy(() => import('../pages/BookingPages/SelectionBooking/SelectionBooking'));
const CustomForm = lazy(() => import('../pages/BookingPages/CustomForm/CustomForm'));
const FlashSelection = lazy(() => import('../pages/BookingPages/FlashSelection/FlashSelection'));
const Events = lazy(() => import ('../pages/EventsPage/Events'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          {/* Rutas públicas*/}
          <Route path='/' element={<Home />} /> 
          <Route path="about" element={<About/>} />
          <Route path="work" element={<Work/>} />
          <Route path="/work/gallery/:type" element={<WorkGallery/>} />
          <Route path="book" element={<SelectionBooking/>} />
          <Route path="book/custom" element={<CustomForm/>} />
          <Route path="book/flash" element={<FlashSelection/>} />
          <Route path="events" element={<Events/>} />
          <Route path="shop" element={<div><h1>Shop (Próximamente)</h1></div>} />

          {/* Ruta para error 404 */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </Router>
    </Suspense>
  )
}

export default AppRoutes