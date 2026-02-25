import React, { useState } from 'react'
import MyButton from '../../../components/MyButton/MyButton';
import axios from 'axios';

const CustomForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bodyPart: '',
        size: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({type: '', msg: ''});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setStatus({type: 'info', msg: 'Enviando solicitud'});
    

    //Uso FormData para enviar archivos
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('bodyPart', formData.bodyPart);
    data.append('size', formData.size);
    data.append('description', formData.description);
    if (file) data.append('reference_img', file);

    try {
        await axios.post('http://localhost:4000/api/booking/custom', data,{
            headers: {'Content-Type': 'multipart/form-data'}
        });
        setStatus({type: 'success', msg: 'Request sent! Maur will contact you soon'})
    } catch (error) {
        console.error("DEBUG ERROR:", error.response?.data || error.message);
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

    <textarea 
    name='description' 
    placeholder='Describe your idea' 
    rows='5' onChange={handleChange} required>
    </textarea>

    <div className='file-input'>
        <label htmlFor="file-upload">UPLOAD REFERENCE IMAGE</label>
        <input id='file-upload' type="file" onChange={handleFileChange} accept='image/*' />
        {file && <span className='file-name'>{file.name}</span>}
    </div>

    <MyButton
        type='submit'
        text='SEND REQUEST'
        className='submit-btn'
    />

    {status.msg && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
    </form>
    </div>
  )
}

export default CustomForm;