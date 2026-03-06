const db = require('../config/db');

//Appointments

const getAllAppointments = async () =>{
    const[rows] = await db.query(
        `SELECT appointments.*, flashes.flash_title, flashes.flash_img_url, flashes.price
         FROM appointments
         LEFT JOIN flashes ON appointments.flash_id = flashes.flash_id
         ORDER BY appointments.created_at DESC`
    );
    return rows;
}

const getAllAppointmentsStatus = async (status) =>{
    const [rows] = await db.query(
        `SELECT appointments.*, flashes.flash_title, flashes.flash_img_url, flashes.price
         FROM appointments
         LEFT JOIN flashes ON appointments.flash_id = flashes.flash_id
         WHERE appointments.status = ?
         ORDER BY appointments.created_at DESC`,
         [status]
    );
    return rows;   
};

const updateAppointmentStatus = async (id, status) =>{
    const [res] = await db.query(
        'UPDATE appointments SET status = ? WHERE appointment_id = ?',
        [Number(status), Number(id)]
    );
    return res;
};

const deleteAppointment = async (id) =>{
    const [res] = await db.query(
        'DELETE FROM appointments WHERE appointment_id = ?', [id]
    );
    return res;
};

//Flashes

const getAllFlashesAdmin = async () =>{
    const [rows] = await db.query('SELECT * FROM flashes ORDER BY flash_id DESC');
    return rows;
};

const createFlash = async (flashData) => {
    const {flash_title, flash_img_url, price, is_available, category_id} = flashData;
    const [res] = await db.query(
        `INSERT INTO flashes (flash_title, flash_img_url, price, is_available, category_id)
        VALUES (?, ?, ?, ?, ?)`,
        [flash_title, flash_img_url, price, is_available ?? 1, category_id]
    );
    return res;
};

const flashAvailability = async (id, is_available) =>{
    const [res] = await db.query(
        'UPDATE flashes SET is_available = ? WHERE flash_id = ?',
        [is_available, id]
    );
    return res;
};

const deleteFlash = async (id) => {
    const [res] = await db.query(
        'DELETE FROM flashes WHERE flash_id = ?', [id]
    );
};

//Works

const createWork = async (workData) =>{
    const { category_id, work_title, description, work_img_url, alt_text } = workData;
    const [res] = await db.query(
        `INSERT INTO works (category_id, work_title, description, work_img_url, alt_text)
         VALUES (?, ?, ?, ?, ?)`,
        [category_id, work_title, description, work_img_url, alt_text || null]
    );
    return res;
};

const deleteWork = async (id) =>{
    const [res] = await db.query(
        'DELETE FROM works WHERE work_id = ?', [id]
    );
    return res;
};

module.exports = {
    getAllAppointments,
    getAllAppointmentsStatus,
    updateAppointmentStatus,
    deleteAppointment,
    getAllFlashesAdmin,
    createFlash,
    flashAvailability,
    deleteFlash,
    createWork,
    deleteWork
};