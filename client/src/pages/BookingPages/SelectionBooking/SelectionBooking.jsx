import {useNavigate} from 'react-router-dom';
import './selectionBooking.css';

const SelectionBooking = () => {
  const navigate = useNavigate();

  return (
    <div className='booking-container'>
      <h2 className='booking-title'>CHOOSE YOUR EXPERIENCE</h2>
      <div className='cards-wrap'>
        {/* Card Flash Tatooo */}
        <div className='booking-card' onClick={() => navigate('/book/flash')}>
          <div className='card-cover'></div>
          <div className='card-content'>
            <h3>FLASH TATTOO</h3>
            <p>Choose one from the gallery and book your appointment</p>
            <button className='card-btn'>SEE DESIGNS</button>
          </div>
        </div>
        {/* Card de Custom Tattoo */}
        <div className='booking-card' onClick={() => navigate('/book/custom')}>
          <div className='card-cover'></div>
          <div className='card-content'>
            <h3>CUSTOM PIECE</h3>
            <p>Tell me your idea. Upload references and let me know your availability</p>
            <button className='card-btn'>REQUEST DESIGN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectionBooking;