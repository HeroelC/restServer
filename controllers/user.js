const { response, request } = require('express');

const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async(req = request, res = response) => {

    const query = req.query;

    const users = await User.find();

    res.json({
        msg: 'get API - Controller',
        users
    });
}

const userPost = async(req, res) => {

    const { name, mail, password, role } = req.body;
    const user = new User( { name, mail, password, role } );

    /** 
     * Encriptar la contraseña
     * Por defecto el genSaltSync esta en 10, mientras más alto el numero mayor seguridad
     *  y mayor procesamiento del servidor
     * **/ 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en database
    await user.save();

    res.json({
        msg: 'Usuario creado con exito',
        user
    });
}

const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, googleUser, mail, ...restParams} = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        restParams.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await User.findByIdAndUpdate( id, restParams);

    res.json({
        msg: 'Usuario actualizado con exito',
        usuario
    });
}

const userDelete = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: 'delete API',
        id
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}