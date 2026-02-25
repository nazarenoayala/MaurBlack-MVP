const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMulter');
const { createCustomBooking, createFlashBooking } = require('../controllers/bookings.controller');

//Ruta para CUSTOM (con imagen adjunta)
router.post('/custom', upload.single('reference_img'), createCustomBooking);

//Ruta para FLASH  (la imagen ya existe en la DB)
router.post('/flash', createFlashBooking);

module.exports = router;