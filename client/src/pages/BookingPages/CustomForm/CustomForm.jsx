import React, { useState } from 'react'
import MyButton from '../../../components/MyButton/MyButton';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import './customForm.css';

const CustomForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bodyPart: '',
        size: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({type: '', msg: ''});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(loading) return;
        setLoading(true);
        setStatus({type: 'info', msg: 'Enviando solicitud'});
        
    //Uso FormData para enviar archivos
    const data = new FormData();
    data.append('appointment_type', 2);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('bodyPart', formData.bodyPart);
    data.append('size', formData.size);
    data.append('description', formData.description);
    if (file) data.append('reference_img', file);

    try {
        await api.post('/booking/custom', data,{
            headers: {'Content-Type': 'multipart/form-data'}
        });
        setShowModal(true);

        setTimeout(() => {
            navigate('/');
        }, 3000)
    } catch (error) {
        console.error("ERROR:", error.response?.data || error.message);
    setStatus({ type: 'error', msg: 'Error. Try again' });
        
    }
    }
  return (
    <div className='form-container'>
        <form className='custom-tattoo-form' onSubmit={handleSubmit}>
        <h2>CUSTOM TATTOO REQUEST</h2>
        <p className='subtitle'>Tell me your idea</p>

        <div className='input-section'>
            <input 
            type='text'
            name='name' 
            placeholder='FULL NAME' 
            onChange={handleChange} required 
            />
            <input 
            type='email'
            name='email' 
            placeholder='EMAIL' 
            onChange={handleChange} required 
            />
        </div>
        <div className='input-section'>
            <input 
            type='text'
            name='bodyPart' 
            placeholder='Body part' 
            onChange={handleChange} required 
            />
            <input 
            type='text'
            name='size' 
            placeholder='Estimate size (cm)' 
            onChange={handleChange} required 
            />
        </div>
        <div className='input-section'>
            <input 
            type='text'
            name='phone' 
            placeholder='Phone (optional)'
            className='input-optional' 
            onChange={handleChange}
            />
        </div>

    <textarea 
    name='description' 
    placeholder='Describe your idea' 
    rows='5' onChange={handleChange} required>
    </textarea>

    <div className='file-input'>
        <label htmlFor="file-upload">UPLOAD REFERENCE IMAGE (Max file size: 20MB — JPG, PNG, WEBP)</label>
        <input id='file-upload' type="file" onChange={handleFileChange} accept='image/*' />
        {file && <span className='file-name'>{file.name}</span>}
    </div>

    <MyButton
        type='submit'
        text={loading ? 'SENDING..' : 'SEND REQUEST'}
        className='submit-btn'
        disabled={loading}
    />

    </form>
    {showModal && (
        <div className='modal-cover'>
            <div className='modal-content-success'>
                <span className="success-icon">✔️</span>
                <h2>REQUEST SENT</h2>
                <p>Maur will contact you via email soon!</p>
                <p className='redirect-text'>Redirecting to Home..</p>
            </div>
        </div>
    )}
    </div>
  )
}

export default CustomForm;