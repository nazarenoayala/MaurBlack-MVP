import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper: adjunto token al admin
const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
    }
});

// --- APPOINTMENTS ---
export const getAppointments = async (status = '') => {
    const query = status ? `?status=${status}` : '';
    const res = await axios.get(`${API_URL}/api/admin/appointments${query}`, authHeader());
    return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
    const res = await axios.patch(`${API_URL}/api/admin/appointments/${id}/status`, { status }, authHeader());
    return res.data;
};

export const deleteAppointment = async (id) => {
    const res = await axios.delete(`${API_URL}/api/admin/appointments/${id}`, authHeader());
    return res.data;
};

// --- FLASHES ---
export const getFlashesAdmin = async () => {
    const res = await axios.get(`${API_URL}/api/admin/flashes`, authHeader());
    return res.data;
};

export const toggleFlash = async (id, is_available) => {
    const res = await axios.patch(`${API_URL}/api/admin/flashes/${id}/availability`, { is_available }, authHeader());
    return res.data;
};

export const deleteFlash = async (id) => {
    const res = await axios.delete(`${API_URL}/api/admin/flashes/${id}`, authHeader());
    return res.data;
};

export const createFlash = async (formData) => {
    const res = await axios.post(`${API_URL}/api/admin/flashes`, formData, {
        headers: {
            ...authHeader().headers,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

// --- WORKS ---
export const getAllWorks = async () => {
    const res = await axios.get(`${API_URL}/api/works`);
    return res.data;
};

export const deleteWork = async (id) => {
    const res = await axios.delete(`${API_URL}/api/admin/works/${id}`, authHeader());
    return res.data;
};

export const createWork = async (formData) => {
    const res = await axios.post(`${API_URL}/api/admin/works`, formData, {
        headers: {
            ...authHeader().headers,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};