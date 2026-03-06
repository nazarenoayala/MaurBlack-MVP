const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middlewares/authToken');
const upload = require('../middlewares/uploadMulter');
const adminController = require('../controllers/admin.controller');

//Rutas admin protegidas
router.use(isAuth, isAdmin);

//Appointments
router.get('/appointments', adminController.getAllAppointments);
router.patch('/appointments/:id/status', adminController.updateAppointmentStatus);
router.delete('/appointments/:id', adminController.deleteAppointment);

//Flashes
router.get('/flashes', adminController.getAllFlashesAdmin);
router.post('/flashes', upload.single('flash_img'), adminController.createFlash);
router.patch('/flashes/:id/availability', adminController.flashAvailability);
router.delete('/flashes/:id', adminController.deleteFlash);

//Works
router.post('/works', upload.single('work_img'), adminController.createWork);
router.delete('/works/:id', adminController.deleteWork);

module.exports = router;