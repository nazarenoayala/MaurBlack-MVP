import { useEffect, useState } from 'react';
import axios from 'axios';
import FlashBookingModal from '../../../components/FlashBookingModal/FlashBookingModal';
import './flashSelection.css';

const FlashSelection = () =>{
    const [flashes, setFlashes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlash, setSelectedFlash] = useState(null); //estado para guardar el flash elegido
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() =>{
        const fetchFlashes = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/flashes');
            console.log("DATOS LLEGANDO:", res.data);
            setFlashes(res.data);
        } catch (error) {
            console.error("ERROR EN PETICIÓN:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchFlashes();
}, []);

    if(loading) return <p>LOADING DESIGNS</p>;

    const handleOpenModal = (flash) => {
        setSelectedFlash(flash);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedFlash(null);
        setModalOpen(false);
    }

    return (
        <div className='flash-selection-container'>
        <div className='flash-grid'>
            {flashes.map((flash) =>(
                <div key={flash.flash_id} 
                     className='flash-card'
                     onClick={() => handleOpenModal(flash)}
                >
                    <div>
                <img 
                    src={flash.flash_img_url} 
                    alt={flash.alt_text} 
                    className='flash-img'
                />
                </div>
                <div className='flash-info'>
                    <h3 className='flash-title'>{flash.flash_title}</h3>
                    <p className='flash-price'>${flash.price}</p>
                </div>    
                </div>
            ))}
        </div>

        {modalOpen && (
            <FlashBookingModal
                flash={selectedFlash}
                onClose={handleCloseModal}
            />
        )}
        </div>
    );
};

export default FlashSelection;