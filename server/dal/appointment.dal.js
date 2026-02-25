const db = require('../config/db');

const createAppointment = async (appointmentData) => {
    const {
        appointment_type, client_name, client_email, client_phone, 
        flash_id, custom_description, reference_img_url
    } = appointmentData

    const [res] = await db.query(
        `INSERT INTO appointments 
        (appointment_type, client_name, client_email, client_phone, flash_id, custom_description, reference_img_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [appointment_type, client_name, client_email, client_phone, flash_id, custom_description, reference_img_url]
    );
    return res;
};

module.exports = { createAppointment };