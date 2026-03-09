import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './workGallery.css';

const WorkGallery = () => {
    const {type} = useParams(); //capturo tipo 1 o 2 de la URL
    const navigate = useNavigate();

    const [images, setImages] = useState([]); //array de fotos de la DB
    const [currentPicture, setCurrentPicture] = useState(0); //foto actual
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchImages = async () =>{
            try {
                //LLamo al endpoint filtrado por tipo
                const res = await api.get(`/works/type/${type}`);
                setImages(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar galeria", error);
                setLoading(false);
            }
        };
        fetchImages();
    }, [type]);

    //funciones de navegacion
    const nextImage = () =>{
        //si es la ultima, vuelve a posicion 0. Si no, resta 1
        setCurrentPicture((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () =>{
        //si es la primera, va a la ultima. Si no, resta 1
        setCurrentPicture((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    //Manejo de estados de carga
    if (loading) return <Loader message="LOADING GALLERY" />;
    if(images.length === 0) return <div className='loading'>No works in this category</div>

    //Extraigo la imagen que corresponde a la posicion actual
    const currentPos = images[currentPicture];

    return (
        <div className='work-gallery-cover'>
            <button className='close-gallery'
                    onClick={() => navigate('/work')}
            > BACK
            </button>
        <div className='main-viewer'>
            
            <div className='image-container'>
                <img key={currentPos.work_id}
                     src={currentPos.work_img_url} 
                     alt={currentPos.work_title}
                     className='focus-image fade-in' 
                />
                <div className='image-info'>
                    <h2>{currentPos.work_title}</h2>
                    <p>{currentPos.description}</p>
        
                {/* Flechas */}
            <div className='arrow-controls'>    
            <button className='arrow-btn'
                    onClick={prevImage}
                >&#10229;
                </button>
            <span className='counter'>
                        {currentPicture + 1} / {images.length}
                    </span>
            <button className='arrow-btn'
                        onClick={nextImage}
                >&#10230;
                </button>
                </div>
                </div>
            </div>
            </div>    
        </div>
    )
}

export default WorkGallery;