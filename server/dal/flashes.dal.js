const db = require('../config/db');

const getAvailableFlashes = async () =>{
    const [rows] = await db.query('SELECT * FROM flashes WHERE is_available = 1');
    return rows;
}

const getFlashById = async (id) =>{
    const [rows] = await db.query('SELECT * FROM flashes WHERE flash_id = ?', [id]);
    return rows[0];
}

module.exports = { getAvailableFlashes, getFlashById };