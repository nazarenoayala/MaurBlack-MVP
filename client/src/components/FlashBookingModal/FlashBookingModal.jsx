import { useState } from 'react'
import api from '../../services/api';
import './flashBookingModal.css';

const FlashBookingModal = ({flash, onClose}) => {
    const [formFlash, setFormFlash] = useState({
        name: '',
        email: '',
        appointment_type: 1,
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
            flash_id: flash.flash_id,
            flash_title: flash.flash_title,
            price: flash.price
        };

        try {
            await api.post('/booking/flash', bookingData);
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
  <div className='modal-cover-form' onClick={onClose}>
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
        <div className='modal-cover'>
        <div className="modal-content-success">
          <span className="success-icon">✔️</span>
          <h2>REQUEST SENT!</h2>
          <p>Maur will contact you via email soon!</p>
          <p className='redirect-text'>Redirecting to Home..</p>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default FlashBookingModal;