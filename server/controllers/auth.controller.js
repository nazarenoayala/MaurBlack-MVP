const db = require('../config/db');
const { generateToken } = require('../utils/jwt');
const { compareString } = require('../utils/bcryptUtils');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'Email and password required'});
        }

        //admin user en la DB
        const [rows] = await db.query(
            'SELECT * FROM admins WHERE email = ?', [email]
        );

        if(rows.length === 0) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const user = rows[0];
        console.log('DB password:', user.password);

        //comparo password con hashed en la DB
        const validPassword = await compareString(password, user.password);
        console.log('Valid:', validPassword);
        if(!validPassword) {
            return res.status(401).json({message:'Invalid credentials'});
        }

        //genero JWT con id y role
        const token = generateToken({id: user.id, role: user.role});
        res.status(200).json({success: true, token});

    } catch (error) {
        console.error('Error login', error);
        res.status(500).json({message: 'Error during login'});
    }
}

module.exports = { login };