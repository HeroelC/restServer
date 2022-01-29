const { Schema, model } = require('mongoose');

const RolsSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model( 'Rols', RolsSchema );