import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoutes'; //wrapper
import Layout from '../components/Layout';
import Loader from '../components/Loader/Loader';

//Carga perezosa
//Public pages
const Home = lazy(() => import('../pages/HomePage/Home'));
const Work = lazy(() => import('../pages/WorkPage/Work'));
const WorkGallery = lazy(() => import('../pages/WorkGallery/WorkGallery'))
const About = lazy(() => import('../pages/AboutPage/About'));
const SelectionBooking = lazy(() => import('../pages/BookingPages/SelectionBooking/SelectionBooking'));
const CustomForm = lazy(() => import('../pages/BookingPages/CustomForm/CustomForm'));
const FlashSelection = lazy(() => import('../pages/BookingPages/FlashSelection/FlashSelection'));
const Shop = lazy (() => import ('../pages/ShopPage/Shop'));
const Events = lazy(() => import ('../pages/EventsPage/Events'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));

//Admin pages
const Login = lazy(() => import('../pages/AdminPages/Login/Login')) ;
const Dashboard = lazy(() => import('../pages/AdminPages/Dashboard/AdminDashboard'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader/>}>
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
          <Route path="shop" element={<Shop/>} />
          {/* Ruta para error 404 */}
          <Route path="*" element={<ErrorPage/>} />
        </Route>

          {/* Rutas admin (no layout) */}
          <Route path='/admin/login' element={<Login/>}/>
          <Route path='/admin/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>

      </Routes>
    </Router>
    </Suspense>
  )
}

export default AppRoutes