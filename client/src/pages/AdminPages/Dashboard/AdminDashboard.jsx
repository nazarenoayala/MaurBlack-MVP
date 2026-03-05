import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAppointments, updateAppointmentStatus, deleteAppointment,
    getFlashesAdmin, toggleFlash, deleteFlash,
    deleteWork
} from '../../../services/admin.service';
import { getAllWorks } from '../../../services/admin.service'; //re uso endpoint publico
import ConfirmModal from '../../../components/ConfirmModalAdmin/ConfirmModal';
import AddFlashModal from '../../../components/AddModals/AddFlashModal/AddFlashModal';
import AddWorkModal from '../../../components/AddModals/AddWorkModal/AddWorkModal';
import { createFlash, createWork } from '../../../services/admin.service';
import './dashboard.css';

//Estados de los appointments
const STATUS_LABELS = { 1: 'Pending', 2: 'Confirmed', 3: 'Done' };
const STATUS_NEXT = { 1: 2, 2: 3, 3: 3 }; // Pending→Confirmed→Done

const Dashboard = () => {
    const navigate = useNavigate();

    //Estado del acordeon
    const [openSection, setOpenSection] = useState('appointments');

    //Estado de la data
    const [appointments, setAppointments] = useState([]);
    const [flashes, setFlashes] = useState([]);
    const [works, setWorks] = useState([]);

    //Estado UI
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    //Estado para añadir flash y work
    const [showAddFlash, setShowAddFlash] = useState(false);
    const [showAddWork, setShowAddWork] = useState(false);

    //Estado para refresh appointments
    const [refreshAppointments, setRefreshAppointments] = useState(0);

    //Confirmacion Modal
    const [modal, setModal] = useState({
    isOpen: false,
    message: '',
    onConfirm: null
});

    //LLamadas para taer data
    const fetchAppointments = async (filter = '') => {
    try {
        const data = await getAppointments(filter);
        setAppointments(data);
    } catch (err) {
        console.error('Error fetching appointments:', err);
    }
};

    const fetchFlashes = async () => {
        try {
            const data = await getFlashesAdmin();
            setFlashes(data);
        } catch (err) {
            console.error('Error fetching flashes:', err);
        }
    };

    const fetchWorks = async () => {
        try {
            const data = await getAllWorks(); // re uso endpoint de public
            setWorks(data);
        } catch (err) {
            console.error('Error fetching works:', err);
        }
    };

    useEffect(() => { 
        fetchAppointments(statusFilter); 
    }, 
    [statusFilter, refreshAppointments]);
    useEffect(() => { fetchFlashes(); }, []);
    useEffect(() => { fetchWorks(); }, []);

    //LOGOUT
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    //ACCORDION
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    //APPOINTMENTS
    const handleStatusUpdate = async (id, currentStatus) => {
    try {
        const nextStatus = currentStatus === 1 ? 2 : 3;
        await updateAppointmentStatus(id, nextStatus);
        setStatusFilter('');
        setRefreshAppointments(prev => prev + 1); // fuerzo renderizacion
    } catch (err) {
        console.error('Error updating status:', err);
    }
};

    const handleDeleteAppointment = (id) => {
    openModal('Delete this appointment?', async () => {
        try {
            await deleteAppointment(id);
            setStatusFilter('');
            setRefreshAppointments(prev => prev + 1);
        } catch (err) {
            console.error('Error deleting appointment:', err);
        } finally {
            closeModal();
        }
    });
};

    //FLASHES
    const handleToggleFlash = async (id, current) => {
        try {
            await toggleFlash(id, current ? 0 : 1);
            fetchFlashes();
        } catch (err) {
            console.error('Error toggling flash:', err);
        }
    };

    const handleDeleteFlash = (id) => {
    openModal('Delete this flash design?', async () => {
        try {
            await deleteFlash(id);
            fetchFlashes();
        } catch (err) {
            console.error('Error deleting flash:', err);
        } finally {
            closeModal();
        }
    });
    };

    //WORKS
    const handleDeleteWork = (id) => {
    openModal('Delete this work from the portfolio?', async () => {
        try {
            await deleteWork(id);
            fetchWorks();
        } catch (err) {
            console.error('Error deleting work:', err);
        } finally {
            closeModal();
        }
    });
};

    //MODAL confirmacion de accion
    const openModal = (message, onConfirm) => {
        setModal({ isOpen: true, message, onConfirm });
};

    //CREATE flash y work
    const handleCreateFlash = async (formData) => {
        await createFlash(formData);
        fetchFlashes();
};

    const handleCreateWork = async (formData) => {
        await createWork(formData);
        fetchWorks();
};

const closeModal = () => {
    setModal({ isOpen: false, message: '', onConfirm: null });
};

    return (
        <div className="dashboard-wrapper">

            {/* Header */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">MAUR BLACK <span>Admin</span></h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            {/* Accordion */}
            <div className="accordion">

                {/* APPOINTMENTS */}
                <div className="accordion-item">
                    <button
                        className={`accordion-trigger ${openSection === 'appointments' ? 'open' : ''}`}
                        onClick={() => toggleSection('appointments')}
                    >
                        <span>Appointments</span>
                        <span className="accordion-count">{appointments.length}</span>
                        <span className="accordion-arrow">{openSection === 'appointments' ? '▲' : '▼'}</span>
                    </button>

                    {openSection === 'appointments' && (
                        <div className="accordion-content">

                            {/* Filter */}
                            <div className="filter-row">
                                <label>Filter by status:</label>
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="1">Pending</option>
                                    <option value="2">Confirmed</option>
                                    <option value="3">Done</option>
                                </select>
                            </div>

                            {appointments.length === 0 ? (
                                <p className="empty-msg">No appointments found.</p>
                            ) : (
                                appointments.map((appt) => (
                                    <div key={appt.appointment_id} className="card">
                                        <div className="card-header">
                                            <span className="card-name">{appt.client_name}</span>
                                            <span className={`status-badge status-${appt.status}`}>
                                                {STATUS_LABELS[appt.status]}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Email:</strong> {appt.client_email}</p>
                                            <p><strong>Phone:</strong> {appt.client_phone}</p>
                                            <p><strong>Type:</strong> {appt.appointment_type === 1 ? '⚡ Flash' : '🎨 Custom'}</p>
                                            {appt.flash_title && <p><strong>Flash:</strong> {appt.flash_title} — ${appt.price}</p>}
                                            {appt.custom_description && <p><strong>Description:</strong> {appt.custom_description}</p>}
                                            {appt.reference_img_url && (
                                                <a href={appt.reference_img_url} target="_blank" rel="noreferrer" className="ref-link">
                                                    View reference image
                                                </a>
                                            )}
                                            <p className="card-date">Received: {new Date(appt.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="card-actions">
                                                {appt.status === 1 && (
                                            <button
                                                className="btn-confirm"
                                                onClick={() => handleStatusUpdate(appt.appointment_id, appt.status)}
                                            >
                                                Confirm
                                            </button>
                                            )}
                                                {appt.status === 2 && (
                                            <button
                                                className="btn-done"
                                                onClick={() => handleStatusUpdate(appt.appointment_id, appt.status)}
                                            >
                                                Mark as Done
                                            </button>
                                            )}
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDeleteAppointment(appt.appointment_id)}
                                            >
                                                Delete
                                            </button>
                                    </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* FLASHES */}
                <div className="accordion-item">
                    <button
                        className={`accordion-trigger ${openSection === 'flashes' ? 'open' : ''}`}
                        onClick={() => toggleSection('flashes')}
                    >
                        <span>Flash Designs</span>
                        <span className="accordion-count">{flashes.length}</span>
                        <span className="accordion-arrow">{openSection === 'flashes' ? '▲' : '▼'}</span>
                    </button>

                    {openSection === 'flashes' && (
                        <div className="accordion-content">
                              <button className="btn-add" onClick={() => setShowAddFlash(true)}>
                                        + Add Flash
                              </button>
                            {flashes.length === 0 ? (
                                <p className="empty-msg">No flash designs found.</p>
                            ) : (
                                <div className="grid">
                                    {flashes.map((flash) => (
                                        <div key={flash.flash_id} className={`card ${!flash.is_available ? 'card-unavailable' : ''}`}>
                                            <img src={flash.flash_img_url} alt={flash.alt_text || flash.flash_title} className="card-img" />
                                            <div className="card-body">
                                                <p className="card-name">{flash.flash_title}</p>
                                                <p>${flash.price}</p>
                                                <span className={`status-badge ${flash.is_available ? 'status-2' : 'status-3'}`}>
                                                    {flash.is_available ? 'Available' : 'Unavailable'}
                                                </span>
                                            </div>
                                            <div className="card-actions">
                                                <button
                                                    className="btn-confirm"
                                                    onClick={() => handleToggleFlash(flash.flash_id, flash.is_available)}
                                                >
                                                    {flash.is_available ? 'Disable' : 'Enable'}
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeleteFlash(flash.flash_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* WORKS */}
                <div className="accordion-item">
                    <button
                        className={`accordion-trigger ${openSection === 'works' ? 'open' : ''}`}
                        onClick={() => toggleSection('works')}
                    >
                        <span>Portfolio Works</span>
                        <span className="accordion-count">{works.length}</span>
                        <span className="accordion-arrow">{openSection === 'works' ? '▲' : '▼'}</span>
                    </button>

                    {openSection === 'works' && (
                        <div className="accordion-content">
                            <button className="btn-add" onClick={() => setShowAddWork(true)}>
                                    + Add Work
                            </button>
                            {works.length === 0 ? (
                                <p className="empty-msg">No works found.</p>
                            ) : (
                                <div className="grid">
                                    {works.map((work) => (
                                        <div key={work.work_id} className="card">
                                            <img src={work.work_img_url} alt={work.alt_text || work.work_title} className="card-img" />
                                            <div className="card-body">
                                                <p className="card-name">{work.work_title}</p>
                                                <p>{work.description}</p>
                                            </div>
                                            <div className="card-actions">
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeleteWork(work.work_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
            <ConfirmModal
                isOpen={modal.isOpen}
                message={modal.message}
                onConfirm={modal.onConfirm}
                onCancel={closeModal}
            />

            <AddFlashModal
                isOpen={showAddFlash}
                onClose={() => setShowAddFlash(false)}
                onSuccess={handleCreateFlash}
            />
            <AddWorkModal
                isOpen={showAddWork}
                onClose={() => setShowAddWork(false)}
                onSuccess={handleCreateWork}
            />
        </div>
    );
};

export default Dashboard;