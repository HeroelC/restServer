
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { mail, password } = req.body;

    try {
        //Verificar si el mail existe
        const user = await User.findOne({ mail });

        if( !user )
            return res.status(400).json({msg: "El mail no existe"});
        
        //Si el usuario esta activo
        if ( !user.status )
            return res.status(400).json({msg: "El usuario ha sido eliminado"});
    
        //Verificar la contraseña
        const validatePassword = bcryptjs.compareSync( password, user.password )
        if( !validatePassword )
            return res.status(400).json({msg: "El password es incorrecto"})

        //Generar JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor, reintente más tarde"
        })
    }
}


module.exports = {
    login
}