const express = require('express');
const router = express.Router();
const {getAllFlashes} = require('../controllers/flashes.controller');

router.get('/', getAllFlashes);

module.exports = router;