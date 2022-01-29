const { response, request } = require("express")

const jwt = require('jsonwebtoken');

const validateJWT = (req = request, resp = response, next) => {

    const token = req.header('Authorization');
    
    if( !token ) return resp.status(401).json({msg: 'No se encontro el token en la petición'});

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET_SEED);
        
        req.uid = uid;

        console.log(uid)
        next();    
    } catch (error) {
        console.log(error);
        return resp.status(401).json({msg: 'Token no válido'});
    }

    
}

module.exports = {
    validateJWT
}