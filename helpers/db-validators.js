const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role) => {

    const exitsRol = await Role.findOne({ role });

    if ( !exitsRol ) throw new Error(`El rol ${role} no existe`);
}

const isExitsMail = async ( mail ) => {

    // Verificar si el correo existe
    const isMailExist = await User.findOne({
        mail
    });

    if (isMailExist) throw new Error(`El email ${mail} ya existe`);
}

const isExistsUserByID = async ( id ) => {

    // Verificar si usuario existe
    const isExistsUser = await User.findById(id);

    if ( !isExistsUser ) throw new Error(`El usuario con ID: ${ id } no existe`);
}

module.exports = {
    isRoleValid,
    isExitsMail,
    isExistsUserByID
}