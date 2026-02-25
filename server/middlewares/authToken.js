const {verifyToken} = require('../utils/jwt');

//nivel de seguridad 1
const isAuth = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: "Acceso denegado, no hay token"});
    }
    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(401).json({ message: "Token invalido"});
    }

    req.user = decoded; //guardo el id y el role que viene en el token
    next();
};

//nivel de seguridad 2
const isAdmin = (req, res, next) =>{
    //verifico si el rol guardado en el token es admin
    if(req.user && req.user.role === 'admin') {
        next(); //si es Maur, ok
    }else {
        res.status(403).json({message: "Denegado: solo el admin puede realizar esta accion"});
    }
};

module.exports = {isAuth, isAdmin};

