const db = require('../config/db');

const getAllWorks = async () => {
    const [rows] = await db.query('SELECT * FROM works');
    return rows;
};

const getWorksByType = async (type) => {
    const [rows] = await db.query(
        `SELECT w.* FROM works w 
         JOIN categories c ON w.category_id = c.category_id 
         WHERE c.category_type = ?`, 
        [type]
    );
    return rows;
}

module.exports = { getAllWorks, getWorksByType };