const multer = require('multer');
const path = require('path');
const { all } = require('../routes/works.routes');

//Donde y como se guardan los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

//Filtro de archivos (solo imagenes y videos)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Formato no permitido. Solo (jpg, png, webp, mp4'), false);
    }
};

//Middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, //limite de 50mb
    },
    fileFilter: fileFilter
});

module.exports = upload;