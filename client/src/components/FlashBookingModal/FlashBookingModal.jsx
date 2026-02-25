import { useState } from 'react'
import axios from 'axios';
import './FlashBookingModal.css';

const FlashBookingModal = ({flash, onClose}) => {
    const [formFlash, setFormFlash] = useState({
        name: '',
        email: '',
        bodyPart: '',
        description: ''
    })
    
    //Estado para notificar que se esta enviando y evitar que siga clickeando
    const [sending, setSending] = useState(false);
    //Estado para mensaje final al enviar
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) return; //evita ejecuciones extra

        setSending(true);

        //Objeto con los datos del cliente + los datos del Flash
        const bookingData = {
            ...formFlash,
            flash_id: flash.flash_title,
            flash_title: flash.flash_title,
            price: flash.price
        };

        try {
            await axios.post('http://localhost:4000/api/booking/flash', bookingData);
            setSuccess(true);
            setTimeout(() => {
            onClose();//cierro modal si se envia con exito, luego de 3 segundos.
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
            alert("Error");
            setSending(false);
        }
    }
  return (
  <div className='modal-cover' onClick={onClose}>
    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
      <button className='close-x-btn' onClick={onClose}>&times;</button>

      {!success ? (
        <>
          <h2 className='modal-header'>Book {flash.flash_title}</h2>

          <div className='modal-body'>
            <div className='modal-image-container'>
              <img 
                src={flash.flash_img_url} 
                alt={flash.alt_text}
                className='modal-preview-img'
              />
            </div>

            <form onSubmit={handleSubmit} className='modal-form'>
              <div className='form-group'>
                <label>Name *</label>
                <input 
                  type="text"
                  required
                  onChange={(e) => setFormFlash({...formFlash, name: e.target.value})} 
                />
              </div>
              <div className='form-group'>
                <label>Email *</label>
                <input 
                  type="email"
                  required
                  onChange={(e) => setFormFlash({...formFlash, email: e.target.value})} 
                />
              </div>
              <div className='form-group'>
                <label>Body Part *</label>
                <input 
                  type="text"
                  required
                  onChange={(e) => setFormFlash({...formFlash, bodyPart: e.target.value})} 
                />
              </div>
              <div className='form-group'>
                <label>Description / Additional details *</label>
                <textarea 
                  required
                  onChange={(e) => setFormFlash({...formFlash, description: e.target.value})} 
                />
              </div>

              <button 
                type='submit' 
                className='confirm-booking-btn'
                disabled={sending}
              >
                {sending ? 'Sending request...' : `Book FLASH - $${flash.price}`}
              </button>
            </form>
          </div>
        </>
      ) : (
        /* Mensaje de exito cuando se envia el form */
        <div className="success-container">
          <span className="success-icon">✔️</span>
          <h2>Request Sent!</h2>
          <p>Maur will contact you soon via email.</p>
        </div>
      )}
    </div>
  </div>
);
};

export default FlashBookingModal;