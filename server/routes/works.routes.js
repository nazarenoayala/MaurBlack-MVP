const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middlewares/authToken'); 
const worksController = require('../controllers/works.controller');

//Todos los trabajos
router.get('/', worksController.getWorks);

//Obtener trabajos segun su tipo de categoria (1: Tattoos, 2: Paints)
router.get('/type/:type', worksController.getWorksByType);

//Solo Admin puede crear nuevo trabajo, flash, pintura: primero comprueba si esta logueado, luego si es admin
router.post('/create', isAuth, isAdmin, worksController.createWork);

//Ejemplo ruta para subir files
//router.post('/upload-work', isAuth, isAdmin, upload.single('image'), (req, res) => {
//    console.log(req.file); // Aquí verás toda la info del archivo guardado
//    res.json({ url: `/uploads/${req.file.filename}` });
//});

module.exports = router;