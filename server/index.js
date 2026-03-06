require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

//Rutas importadas
const worksRoutes = require('./routes/works.routes');
const bookingRoutes = require('./routes/booking.routes');
const flashRoutes = require('./routes/flash.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const eventsRoutes = require('./routes/events.routes');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Rutas usadas
app.use('/api/works', worksRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/flashes', flashRoutes);
app.use('/api/events', eventsRoutes);

//Rutas admin
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Servidor de MaurBlack corriendo por el ${PORT}`);
    
});