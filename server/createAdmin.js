const bcrypt = require('bcrypt');
const db = require('./config/db');

const createAdmin = async () => {
    const email = 'maurttst@gmail.com';
    const password = 'guinter95494';
    const hashed = await bcrypt.hash(password, 10);
    
    await db.query(
        'INSERT INTO admins (email, password, role) VALUES (?, ?, ?)',
        [email, hashed, 'admin']
    );
    
    console.log('Admin created successfully');
    process.exit(0);
};

createAdmin().catch(err => {
    console.error(err);
    process.exit(1);
});