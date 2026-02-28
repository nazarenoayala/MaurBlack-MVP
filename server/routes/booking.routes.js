const express = require('express');
const router = express.Router();
const { createCustomBooking, createFlashBooking } = require('../controllers/bookings.controller');
const { validateBooking } = require('../middlewares/bookValidator');
const upload = require('../middlewares/uploadMulter');

//Ruta para CUSTOM (con imagen adjunta)
router.post('/custom', upload.single('reference_img'), validateBooking, createCustomBooking);
//Ruta para FLASH  (la imagen ya existe en la DB)
router.post('/flash', validateBooking, createFlashBooking);

module.exports = router;