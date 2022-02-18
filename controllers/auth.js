
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { response } = require('express');

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

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {
        const { name, img, mail } = await googleVerify( id_token );

        console.log( name, img, mail );

        let usuario = await User.findOne({ mail });

        //Si el usuario no existe, hay que crearlo
        if( !usuario ){
           const data = {
               name,
               mail,
               img,
               password: 'empty',
               role: 'USER_ROLE', 
               google: true
           }

           console.log( data );
           usuario = new User( data );
           await usuario.save();
        }

        if( !usuario.status ) return res.status(401).json({msg: 'Usuario bloqueado' })

        //Generar el JWT
        const token = await generateJWT( usuario.id );

        res.json({
            msg: "Token válido",
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error procesando la solicitud'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}